import { MapDetail } from '../../models/MapDetail';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ApiService';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceResponseData } from '../../models/ServiceResponseData';
import { Location } from '@angular/common'

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent implements OnInit {
  testResponse: ServiceResponseData
  name: string;
  mapname: string
  _request: string
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _apiService: ApiService, 
    private _location: Location,
    private _router: Router,) {
    this.name = this._route.snapshot.paramMap.get('name')
    this.mapname = this._route.snapshot.paramMap.get('mapname')
  }

  get request(): string {
    return this._request;
  }
  set request(value: string) {
    this._request = value;
  }
  ngOnInit() {
    this._apiService.getMapDetail(this.name, this.mapname)
      .subscribe(mapDetail =>
        this.request = mapDetail.request,
        error => this.errorMessage = <any>error.message)
  }

  onSubmit(): void {
    console.log('submitting...')
    this.errorMessage = null
    this.testResponse = null
    this._apiService.submitRequest(this.name, this.request)
      .subscribe(response => this.testResponse = response,
        error => this.errorMessage = <any>error.message)
  }

  backClicked() {
    this._location.back();
  }

  logsClicked() {
    this._router.navigate(['/logs']);
  }
}
