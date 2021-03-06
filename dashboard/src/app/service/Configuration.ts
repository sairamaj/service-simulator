import { HttpClient } from '@angular/common/http';

export class Config {
    baseUrl: string
    adminUrl: string
    adminServicesApiUrl: string;
    constructor() {
        if (this.isDashboardDev()) {
            this.baseUrl = 'http://localhost:3000';
        } else {
            this.baseUrl = ''
        }
        this.adminServicesApiUrl = this.baseUrl + '/api/v1/admin/services'
        this.adminUrl = this.baseUrl + '/api/v1/admin/'
    }

    getServiceDetailsUrl(name: string): string {
        return this.adminServicesApiUrl + '/' + name;
    }

    getProviderInfoUrl(): string {
        return this.adminUrl + 'provider';
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

    getAddNewServiceUrl(): string {
        return this.adminServicesApiUrl ;
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

    getClearLastRequestUrl(serviceName: string){
        return this.adminServicesApiUrl + '/' + serviceName + '/processedrequests/';
    }

    getLogRequestUrl() {
        return this.adminUrl + 'logs';
    }

    isDashboardDev(): boolean {
        return false
    }
}

export class Configuration {
    Config: Config;

    constructor(private _http: HttpClient) {
    }
}
