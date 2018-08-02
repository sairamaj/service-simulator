import { ServiceManager } from './ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo'; 56

import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { ServiceFileProvider } from './ServiceFileProvider';
import { ProcessedRequest } from '../model/ProcessedRequest';
import { ProcessLogFileManager } from './ProcessedLogFileManager';
import { MapDetail } from '../model/MapDetail';
var debug = require('debug')('servicesfileprovider')

export class ServicesFileProvider implements ServiceManager {
    constructor(public fileProviderLocation: string){
    }
 
    public getServices(): Promise<Service[]> {
        debug('enter:getServices')
        debug('reading :' + this.getFilesProviderLocation() + '/*')

        return new Promise<Service[]>((resolve, reject) => {
            glob(this.getFilesProviderLocation() + '/*', (err, dirs) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(dirs.map(d => {
                        var name = d.split('/').slice(-1)[0]
                        return new Service(name, new ServiceFileProvider(name, this.getFilesProviderLocation()).getConfigMap())
                    }));
                }
            });
        });
    }

    public async getService(name: string): Promise<Service> {
        debug('enter:getService');
        var services = await this.getServices();
        return services.find(s => s.name == name);
    }

    public addService(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true)
        })
    }

    public async getMapDetail(name: string, mapName: string): Promise<MapDetail> {
        var serviceProvider = new ServiceFileProvider(name, this.getFilesProviderLocation());
        return await serviceProvider.getMapDetail(mapName);
    }

    public async addNewResponse(name: string, mapDetail: MapDetail): Promise<boolean> {
        var serviceProvider = new ServiceFileProvider(name, this.getFilesProviderLocation());
        return await serviceProvider.addNewResponse(mapDetail);
    }

    public async modifyNewResponse(name: string, mapDetail: MapDetail): Promise<boolean> {
        var serviceProvider = new ServiceFileProvider(name, this.getFilesProviderLocation());
        return await serviceProvider.addNewResponse(mapDetail);
    }

    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        debug('enter:getResponse');

        var serviceProvider = new ServiceFileProvider(name, this.getFilesProviderLocation());
        var processInfo = await serviceProvider.getResponse(request);
        if (processInfo === undefined) {
            return undefined;
        }

        return processInfo;
    }

    getFilesProviderLocation(): string {
        return this.fileProviderLocation;
    }

    public async logRequest(name: string, date: Date, status: number, processInfo: ProcessInfo): Promise<boolean> {
        await new ProcessLogFileManager(name, this.getFilesProviderLocation()).writeLog(new ProcessedRequest(date, status, processInfo.request, processInfo.response, processInfo.matches));
        return true;
    }

    public async getProcessedRequests(name: string): Promise<ProcessedRequest[]> {
        return await new ProcessLogFileManager(name, this.getFilesProviderLocation()).getLogs();
    }

    public async getProcessedRequest(name: string, id: string): Promise<ProcessedRequest> {
        return await new ProcessLogFileManager(name, this.getFilesProviderLocation()).getLog(id)
    }

    public async clearProcessedRequests(name: string): Promise<boolean> {
        await new ProcessLogFileManager(name, this.getFilesProviderLocation()).clearLogs();
        return true;
    }
}