import { Component, OnInit } from '@angular/core';
import { SimulatedResponseData } from '../../host/SimulatedResponseData';
import { HostService } from '../../host/host-service';
import { ActivatedRoute } from '@angular/router';
import { IResponseMap } from '../../host/responsemap';

@Component({
  selector: 'app-host-newresponse',
  templateUrl: './service-edit-response.component.html',
  styleUrls: ['./service-edit-response.component.css']
})
export class ServiceEditResponseComponent implements OnInit {
  title: string;
  errorMessage: string;
  statusMessage: string;
  hostName: string;
  mapName: string;
  responseMaps: IResponseMap[];
  model = new SimulatedResponseData(
    '',
    '',
    '',
    '',
    '',
    '',
    []);
  constructor(private _route: ActivatedRoute,
    private _hostService: HostService) {
    this.hostName = this._route.snapshot.paramMap.get('name');
    this.mapName = this._route.snapshot.paramMap.get('mapname');
    this.model.name = this.mapName;
    this.title = 'Create new response map';
    if (this.mapName !== null) {
      this.title = 'Edit ' + this.mapName + ' map';
      this._hostService.getMapDetail(this.hostName, this.mapName)
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
    this._hostService.addNewResponse(this.hostName, this.model)
      .subscribe(msg => this.statusMessage = JSON.stringify(msg),
        error => this.errorMessage = <any>error);
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
