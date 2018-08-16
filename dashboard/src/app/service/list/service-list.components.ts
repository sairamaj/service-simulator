import { Component, OnInit } from '@angular/core'
import { ApiService } from '../ApiService';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/Service';
import { Router } from '@angular/router';
import { Provider } from '../../models/Provider';
@Component(
    {
        selector: 'sim-services',
        templateUrl: './service-list.component.html',
        styleUrls: ['./service-list.component.css']
    }
)

export class ServiceListComponent implements OnInit {

    services: Service[] = [];
    errorMessage: string;
    pageTitle = 'Services';
    provider: Provider;

    ngOnInit(): void {
        this._apiService.getServices()
            .subscribe(result => this.services = result,
                error => this.errorMessage = <any>error.message)
        this._apiService.getProvider()
            .subscribe(result => this.provider = result,
                error => this.errorMessage = <any>error.message)
    }

    constructor(private _apiService: ApiService,
        private _http: HttpClient,
        private _router: Router, ) {
    }

    onLogs(): void {
        this._router.navigate(['/logs']);
    }

    onNew(): void {
        this._router.navigate(['services/new']);
    }

}
