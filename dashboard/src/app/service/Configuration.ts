import { HttpClient } from '@angular/common/http';

export class Config {
    baseUrl: string
    adminUrl: string
    adminServicesApiUrl: string;
    constructor() {
        //  this.baseUrl = 'http://localhost:3000';
        this.baseUrl = ''
        this.adminServicesApiUrl = this.baseUrl + '/api/v1/admin/services'
        this.adminUrl = this.baseUrl + '/api/v1/admin/'
    }

    getServiceDetailsUrl(name: string): string {
        return this.adminServicesApiUrl + '/' + name;
    }

    getServiceResponseFileUrl(name: string, file: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/details/response/' + file;
    }

    getServiceRequestFileUrl(name: string, mapName: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/details/request/' + mapName;
    }

    getServiceSimulatorUrl(name: string): string {
        return this.adminServicesApiUrl + '/' + name + '/test'
    }

    getAddNewResponseUrl(name: string): string {
        return this.adminServicesApiUrl + '/' + name + '/maps';
    }

    getLastRequestUrl(name: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/lastrequests';
    }

    getMapDetailUrl(serviceName: string, mapName: string) {
        return this.adminServicesApiUrl + '/' + serviceName + '/maps/' + mapName;
    }

    getProcessedRequests(serviceName: string) {
        return this.adminServicesApiUrl + '/' + serviceName + '/processedrequests';
    }

    getProcessedRequest(serviceName: string, id: string) {
        return this.adminServicesApiUrl + '/' + serviceName + '/processedrequests/' + id;
    }

    getLogRequestUrl() {
        return this.adminUrl + 'logs';
    }
}

export class Configuration {
    Config: Config;

    constructor(private _http: HttpClient) {
    }
}
