import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ApiService';
import { ActivatedRoute } from '@angular/router';
import { IResponseMap } from '../../models/IResponseMap';
import { SimulatedResponseData } from '../../models/SimulatedResponseData';
import { Location } from '@angular/common'

@Component({
  selector: 'app-service-newresponse',
  templateUrl: './service-edit-response.component.html',
  styleUrls: ['./service-edit-response.component.css']
})
export class ServiceEditResponseComponent implements OnInit {
  title: string;
  errorMessage: string;
  statusMessage: string;
  serviceName: string;
  mapName: string;
  responseMaps: IResponseMap[];
  model = new SimulatedResponseData(
    '',
    '',
    '',
    '',
    []);
  constructor(private _route: ActivatedRoute,
    private _apiService: ApiService, private _location: Location) {
    this.serviceName = this._route.snapshot.paramMap.get('name');
    this.mapName = this._route.snapshot.paramMap.get('mapname');
    this.model.name = this.mapName;
    this.title = 'Create new response map';
    if (this.mapName !== null) {
      this.title = 'Edit ' + this.mapName + ' map';
      this._apiService.getMapDetail(this.serviceName, this.mapName)
        .subscribe(mapDetail => {
          this.model.matchString = mapDetail.matches.join();
          this.model.request = mapDetail.request;
          this.model.response = mapDetail.response;
        },
          error => this.errorMessage = <any>error);
    }
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log('adding new response:' + this.model.name);
    this.errorMessage = '';
    this.model.matches = [];
    this.model.matchString.split(',').forEach(m => { this.model.matches.push(m); });
    this._apiService.addNewResponse(this.serviceName, this.model)
      .subscribe(msg => this.statusMessage = JSON.stringify(msg),
        error => this.errorMessage = <any>error);
  }

  get diagnostic() { return JSON.stringify(this.model); }

  backClicked() {
    this._location.back();
  }
}
