import { ServiceManager } from './ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import { ProcessedRequest } from '../model/ProcessedRequest';
import { MapDetail } from '../model/MapDetail';
import { InMemoryProcessedRequestContainer } from './InMemoryProcessedRequestContainer';
import * as path from 'path';
import { resolve } from 'url';
const debug = require('debug')('inmemoryprovider')

export class InMemoryProvider implements ServiceManager {
    static TestData: any;
    constructor(testFile: string) {
        if (InMemoryProvider.TestData === undefined) {
            debug(`using ${testFile}`)
            InMemoryProvider.TestData = require(testFile);
        }
    }

    public async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve) => {
            resolve(InMemoryProvider.TestData);
        });
    }

    public async getService(name: string): Promise<Service> {
        var services = await this.getServices();
        return services.find(h => h.name.toLocaleLowerCase() == name.toLocaleLowerCase())
    }

    public addService(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            var newService = {
                name : name,
                config : []
            }
            InMemoryProvider.TestData.push(newService)
            resolve(true)
        })
    }

    public async getMapDetail(name: string, mapName: string): Promise<MapDetail> {
        return new Promise<MapDetail>((resolve) => {
            var service = InMemoryProvider.TestData.find(s => s.name === name);
            if (service === undefined) {
                resolve(undefined)
            }

            var mapInfo = service.config.find(c => c.name === mapName)
            if (mapInfo === undefined) {
                resolve(undefined)
            }

            var mapDetail = new MapDetail(mapInfo.name, mapInfo.request, mapInfo.response, mapInfo.matches)
            resolve(mapDetail)
        });
    }

    public addNewResponse(name: string, mapDetail: MapDetail): Promise<boolean> {
        debug('enter addNewResponse')
        return new Promise<boolean>((resolve, reject) => {
            var service = InMemoryProvider.TestData.find(s => s.name === name);
            if (service === undefined) {
                reject('service ' + name + ' not found')
            }

            if (service.config === undefined) {
                service.config = []
            }

            service.config.push(mapDetail)
            resolve(true)
        })
    }

    public modifyNewResponse(name: string, mapDetail: MapDetail): Promise<boolean> {
        debug('enter modifyNewResponse')
        return new Promise<boolean>((resolve, reject) => {
            var service = InMemoryProvider.TestData.find(s => s.name === name);
            if (service === undefined) {
                reject('service ' + name + ' not found')
            }

            if (service.config === undefined) {
                reject(mapDetail.name + ' not found in ' + name)
            }

            var foundMap = service.config.find(c => c.name == mapDetail.name)
            if (foundMap === undefined) {
                reject(mapDetail.name + ' not found in ' + name)
            }

            foundMap.request = mapDetail.request
            foundMap.response = mapDetail.response
            foundMap.matches = mapDetail.matches
            resolve(true)
        })
    }

    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        var service = await this.getService(name)
        if (service === undefined || service.config === undefined) {
            debug('warn: ' + name + ' not found.')
            return undefined;
        }

        var foundConfig = service.config.find(c => {
            if (c.matches === undefined) {
                return false;
            }

            return c.matches.every(m => request.includes(m))
        });

        if (foundConfig === undefined) {
            debug('warn: matching not found.')
            return undefined;
        }
        debug('foundConfig:' + JSON.stringify(foundConfig))

        var processInfo = new ProcessInfo(request)
        processInfo.matches = foundConfig.matches
        processInfo.response = foundConfig.response
        processInfo.contentType = service.contentType
        return processInfo;
    }

    public async logRequest(name: string, date: Date, status: number, processInfo: ProcessInfo): Promise<boolean> {
        debug('logRequest.enter')
        return new Promise<boolean>((resolve) => {
            InMemoryProcessedRequestContainer.add(new ProcessedRequest(date, status, processInfo.request, processInfo.response, processInfo.matches))
            resolve(true);
        });
    }

    public async getProcessedRequests(name: string): Promise<ProcessedRequest[]> {
        debug('getProcessedRequests.enter')
        return new Promise<ProcessedRequest[]>((resolve) => {
            var counter = 0
            var logs = InMemoryProcessedRequestContainer.getLogs();
            logs.forEach(l => {
                counter++;
                l.id = counter.toString()
            })
            resolve(logs);
        });
    }

    public getProcessedRequest(name: string, id: string): Promise<ProcessedRequest> {
        debug('enter getProcessedRequest: ' + id)
        return new Promise<ProcessedRequest>((resolve, reject) => {
            var logs = InMemoryProcessedRequestContainer.getLogs();
            debug('logs length' + logs.length)
            try {
                let index = +id - 1
                if (logs.length >= index) {
                    debug('returning log')
                    resolve(logs[index])
                } else {
                    resolve(undefined)
                }
            } catch (error) {
                reject(error)
            }
        });
    }

    public async clearProcessedRequests(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            InMemoryProcessedRequestContainer.clear();
            resolve(true);
        });
    }
}