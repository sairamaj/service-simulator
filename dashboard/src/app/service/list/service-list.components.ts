import { Component, OnInit } from '@angular/core'
import { ApiService } from '../ApiService';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/Service';
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
    pageTitle = 'Hosts';

    ngOnInit(): void {
        this._hostService.getServices()
            .subscribe(result => this.services = result,
                error => this.errorMessage = <any>error)
    }

    constructor(private _hostService: ApiService, private _http: HttpClient) {
    }
}
