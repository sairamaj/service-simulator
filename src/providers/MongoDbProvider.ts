import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ServiceSchema } from '../model/ServiceSchema';
import { ResponseSchema } from '../model/ResponseSchema';
import { RequestSchema } from '../model/RequestSchema';
import { LogRequestSchema } from '../model/LogRequestSchema';
import { ProcessInfo } from '../model/ProcessInfo';
import * as mongoose from "mongoose";
import { ProcessedRequest } from '../model/ProcessedRequest';
import { MapDetail } from '../model/MapDetail';
const debug = require('debug')('mongodbprovider')

const ServiceDbSchema = mongoose.model('services', ServiceSchema);
const ResponseDbSchema = mongoose.model('responses', ResponseSchema);
const RequestDbSchema = mongoose.model('requests', RequestSchema);
const LogRequestDbSchema = mongoose.model('logs', LogRequestSchema);


export class MongoDbProvider implements ServiceManager {
    public async getServices(): Promise<Service[]> {
        debug('enter getServices')
        return await ServiceDbSchema.find({});
    }

    public async getService(name: string): Promise<Service> {
        debug('enter getService')
        const cursor = await ServiceDbSchema.find({ name: name });
        if (cursor.length > 0) {
            return cursor[0]
        }

        debug('service ' + name + ' found');
        return undefined;
    }

    public async getMapDetail(name: string, mapName: string): Promise<MapDetail> {
        debug('enter getMapDetail')
        var service = await this.getService(name)
        if (service === undefined) {
            debug('warn service ' + name + ' not found')
            return undefined
        }

        if (service.config === undefined) {
            debug('warn config for service ' + name + ' not found')
            return undefined
        }

        var foundConfig = service.config.find(c => c.name === mapName)
        if (foundConfig === undefined) {
            debug('warn match not found for service ' + name + ' for mapName ' + mapName)
            return undefined
        }

        var responseData = await this.getResponseData(name, mapName)
        var requestData = await this.getRequestData(name, mapName)
        return new MapDetail(mapName, requestData, responseData, foundConfig.matches)
    }

    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        debug('enter getResponse: ' + name)
        var service = await this.getService(name);

        if (service === undefined) {
            debug('warn: ' + name + ' not found.');
            return undefined;
        } else if (service.config === undefined) {
            debug('warn: ' + name + ' config not found.');
            return undefined;
        }

        var foundConfig = service.config.find(c => {
            if (c.matches === undefined) {
                return false;
            }

            return c.matches.every(m => request.includes(m));
        });

        if (foundConfig === undefined) {
            debug('warn: matching not found.');
            return undefined;
        }
        debug('foundConfig:' + JSON.stringify(foundConfig));

        var responseNameKey = name + "_response_" + foundConfig.name;
        debug('reading mongodb:' + responseNameKey);
        return new Promise<ProcessInfo>((resolve, reject) => {
            ResponseDbSchema.find({
                name: responseNameKey
            }, (err, response) => {
                if (err) {
                    debug('warn:' + err);
                    reject(err);
                } else {
                    if (response.length == 0) {
                        resolve(undefined)
                        return
                    }

                    var processInfo = new ProcessInfo(request);
                    processInfo.matches = foundConfig.matches;
                    processInfo.response = response[0].response;
                    resolve(processInfo);
                }
            })
        });
    }

    public async logRequest(name: string, date: Date, status: number, processInfo: ProcessInfo): Promise<boolean> {
        debug('enter logRequest')
        var matches = ''
        if (processInfo.matches !== undefined) {
            matches = processInfo.matches.join(',')
        }
        await LogRequestDbSchema.collection.insertOne(
            {
                name: name,
                date: date,
                status: status,
                request: processInfo.request,
                response: processInfo.response,
                matches: matches
            });
        return true;
    }

    public async getProcessedRequests(name: string): Promise<ProcessedRequest[]> {
        debug('enter getProcessedRequests:' + name)
        var results = []
        var response = await LogRequestDbSchema.collection.find({
            name: name
        }).toArray();

        response.forEach(r => {
            var processRequest = new ProcessedRequest(r.date, r.status, r.request, r.response, r.matches)
            processRequest.id = r._id
            results.push(processRequest);
        });

        return results;
    }

    public async getProcessedRequest(name: string, id: string): Promise<ProcessedRequest> {
        var processedRequest = await LogRequestDbSchema.findById(id)
        if (processedRequest !== undefined) {
            var processRequest = new ProcessedRequest(processedRequest.date,
                processedRequest.status,
                processedRequest.request,
                processedRequest.response, processedRequest.matches)
            processRequest.id = id
            return processRequest
        }

        return undefined
    }

    public async clearProcessedRequests(name: string): Promise<boolean> {
        await LogRequestDbSchema.collection.remove({
            name: name
        });

        return true;
    }

    private async getResponseData(name: string, mapName: string): Promise<string> {
        var responseNameKey = name + "_response_" + mapName;
        var responses = await ResponseDbSchema.find({
            name: responseNameKey
        });

        if (responses.length > 0) {
            return responses[0].response
        }

        return undefined
    }

    private async getRequestData(name: string, mapName: string): Promise<string> {
        var requestNameKey = name + "_request_" + mapName;
        var requests = await RequestDbSchema.find({
            name: requestNameKey
        });

        if (requests.length > 0) {
            return requests[0].request
        }

        return undefined
    }
}