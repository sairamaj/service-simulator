import { Component, OnInit } from '@angular/core'
import { ApiService } from '../ApiService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Log } from '../../models/Log';
import { Location } from '@angular/common'

@Component(
    {
        selector: 'sim-services',
        templateUrl: './service-logs.component.html',
        styleUrls: ['./service-logs.component.css']
    }
)

export class ServiceLogsComponent implements OnInit {

    logs: Log[] = [];
    errorMessage: string;
    pageTitle = 'Logs';

    ngOnInit(): void {
        this._apiService.getLogs()
            .subscribe(result => this.logs = result,
                error => this.errorMessage = <any>error.message)
    }

    constructor(private _apiService: ApiService,
        private _http: HttpClient,
        private _router: Router,
        private _location: Location) {
    }

    backClicked() {
        this._location.back();
    }
}
