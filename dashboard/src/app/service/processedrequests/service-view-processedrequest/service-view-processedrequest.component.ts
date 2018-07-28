import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../ApiService';
import { ProcessedRequest } from '../../../models/ProcessedRequest';
import { Location } from '@angular/common'

@Component({
  selector: 'app-service-viewservedrequests',
  templateUrl: './service-view-processedrequest.component.html',
  styleUrls: ['./service-view-processedrequest.component.css']
})
export class ServiceViewProcessedRequestComponent implements OnInit {

  errorMessage: string;
  name: string;
  id: string;
  constructor(private _route: ActivatedRoute,
    private _apiService: ApiService
    ,private _location: Location) {
    this.name = this._route.snapshot.paramMap.get('name')
    this.id = this._route.snapshot.paramMap.get('id')
  }

  servedRequest: ProcessedRequest;
  ngOnInit(): void {
    this._apiService.getProcessRequest(this.name, this.id)
      .subscribe(servedRequest => this.servedRequest = servedRequest,
        error => this.errorMessage = <any>error)
  }

  backClicked() {
    this._location.back();
  }
}
