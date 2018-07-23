import { Injectable } from '@angular/core';
import { IHost } from './host';
import { HttpClient } from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Observable, throwError, Observer } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { IResponseMap } from './responsemap';
import { SimulatedResponseData } from './SimulatedResponseData';
import { HostLastRequest } from './hostlastrequest';
import { Config } from './Configuration';
import { hostResponseData } from './hostResponseData';
import { MapDetail } from '../models/MapDetail';
import { ServedRequests } from './ServedRequest';
import { Service } from '../models/Service';
import { ProcessedRequest } from '../models/ProcessedRequest';


@Injectable()
export class HostService {
    Configuration: Config;
    constructor(private _http: HttpClient, private _location: Location) {
        this.Configuration = new Config();
    }

    getServices(): Observable<Service[]> {
        return this._http.get<Service[]>(this.Configuration.adminApiUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError), );
    }

    getServiceDetails(name: string): Observable<Service> {
        console.log('getServiceDetails url:' + this.Configuration.getServiceDetailsUrl(name));
        return this._http.get<Service>(this.Configuration.getServiceDetailsUrl(name)).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError), );
    }

    getHostResponseFileContent(name: string, file: string): Observable<string> {
        const responseInfoUrl = this.Configuration.getHostResponseFileUrl(name, file);
        return this._http.get<string>(responseInfoUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError), );
    }

    getHostRequestFileContent(name: string, mapName: string): Observable<string> {
        const requestInfoUrl = this.Configuration.getHostRequestFileUrl(name, mapName);
        return this._http.get<string>(requestInfoUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError), );
    }

    submitRequest(host: string, request: string): Observable<hostResponseData> {
        const requestProcessingUrl = this.Configuration.getHostSimulatorUrl(host);
        return this._http.post<hostResponseData>(requestProcessingUrl, request)
            .pipe(tap(data => console.log('received:' + data.code)),
                catchError(this.handleError));
    }

    addNewResponse(hostName: string, info: SimulatedResponseData): Observable<any> {
        const addUrl = this.Configuration.getAddNewResponseUrl(hostName);
        console.log('posting to:' + addUrl);
        console.log('adding info:' + JSON.stringify(info));
        return this._http.post<string>(addUrl, info)
            .pipe(tap(data => console.log('received')),
                catchError(this.handleError));
    }

    getMapDetail(hostName: string, mapName: string): Observable<MapDetail> {
        const mapDetailUrl = this.Configuration.getMapDetailUrl(hostName, mapName);
        return this._http.get<MapDetail>(mapDetailUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError), );
    }

    getLastRequests(hostName): Observable<ProcessedRequest[]> {
        const servedRequestUrl = this.Configuration.getProcessedRequests(hostName);
        return this._http.get<ProcessedRequest[]>(servedRequestUrl).pipe(
            tap(data => console.log('getLastRequests:')),
            catchError(this.handleError), );
    }

    getProcessRequest(serviceName, id): Observable<ProcessedRequest> {
        const servedRequestUrl = this.Configuration.getProcessedRequest(serviceName, id);
        return this._http.get<ProcessedRequest>(servedRequestUrl).pipe(
            tap(data => console.log('getLastRequests:')),
            catchError(this.handleError), );
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            const additionalMessage = JSON.stringify(err.error, null, '\t');
            errorMessage = `Server returned code: ${err},
                    error message is: ${err.message}
                    additional info: ${additionalMessage}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
