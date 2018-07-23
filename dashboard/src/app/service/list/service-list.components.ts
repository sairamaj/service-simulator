import { Component, OnInit } from '@angular/core'
import { HostService } from '../../host/host-service';
import { IHost } from '../../host/host';
import { map, tap, catchError } from 'rxjs/operators';
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

    constructor(private _hostService: HostService, private _http: HttpClient) {
    }
}
