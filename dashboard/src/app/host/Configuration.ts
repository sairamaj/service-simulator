import { HttpClient } from '@angular/common/http';

export class Config {
    baseUrl: string;
    adminApiUrl: string;
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        // this.baseUrl = ''
        this.adminApiUrl = this.baseUrl + '/api/v1/admin/services';
    }

    getServiceDetailsUrl(name: string): string {
        return this.adminApiUrl + '/' + name;
    }

    getHostResponseFileUrl(name: string, file: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/details/response/' + file;
    }

    getHostRequestFileUrl(name: string, mapName: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/details/request/' + mapName;
    }

    getHostSimulatorUrl(name: string): string {
        return this.adminApiUrl + '/' + name + '/test'
    }

    getAddNewResponseUrl(name: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/response';
    }

    getLastRequestUrl(name: string): string {
        return this.baseUrl + '/admin/api/hosts/' + name + '/lastrequests';
    }

    getMapDetailUrl(serviceName: string, mapName: string) {
        return this.adminApiUrl + '/' + serviceName + '/maps/' + mapName;
    }

    getProcessedRequests(serviceName: string) {
        return this.adminApiUrl + '/' + serviceName + '/processedrequests';
    }

    getProcessedRequest(serviceName: string, id: string) {
        return this.adminApiUrl + '/' + serviceName + '/processedrequests/' + id;
    }
}

export class Configuration {
    Config: Config;

    constructor(private _http: HttpClient) {
        console.log('before get...');
        // this._http.get("./assets/config.json")
        //     .subscribe(res => {
        //         console.log('in res:' + res)
        //         this.Config = <Config>res
        //         console.log('getHostUrl:' + this.Config.getHostsUrl)
        //     })
        console.log('after  get...');
    }
}
