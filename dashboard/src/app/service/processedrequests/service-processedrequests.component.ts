import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../ApiService';
import { ProcessedRequest } from '../../models/ProcessedRequest';
import { Location } from '@angular/common'

@Component({
  selector: 'app-host-servedrequests',
  templateUrl: './service-processedrequests.component.html',
  styleUrls: ['./service-processedrequests.component.css']
})
export class ServiceProcessedRequestComponent implements OnInit {

  errorMessage: string;
  name: string;
  constructor(private _route: ActivatedRoute, 
    private _hostService: ApiService, 
    private _location: Location) {

    this.name = this._route.snapshot.paramMap.get('name')
  }

  servedRequests: ProcessedRequest[];
  ngOnInit(): void {
    this._hostService.getLastRequests(this.name)
      .subscribe(servedRequests => this.servedRequests = servedRequests,
        error => this.errorMessage = <any>error)
  }

  backClicked() {
    this._location.back();
  }

}
