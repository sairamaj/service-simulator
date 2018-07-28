import { Component, OnInit } from '@angular/core'
import { ApiService } from '../ApiService';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/Service';
import { Router } from '@angular/router';
@Component(
    {
        selector: 'sim-hosts',
        templateUrl: './service-list.component.html',
        styleUrls: ['./service-list.component.css']
    }
)

export class ServiceListComponent implements OnInit {

    services: Service[] = [];
    errorMessage: string;
    pageTitle = 'Services';

    ngOnInit(): void {
        this._hostService.getServices()
            .subscribe(result => this.services = result,
                error => this.errorMessage = <any>error)
    }

    constructor(private _hostService: ApiService, 
        private _http: HttpClient,
        private _router: Router,) {
    }

    onLogs(): void {
        this._router.navigate(['/logs']);
    }
}
