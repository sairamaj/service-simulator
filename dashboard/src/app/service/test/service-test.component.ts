import { MapDetail } from '../../models/MapDetail';
import { Component, OnInit } from '@angular/core';
import { HostService } from '../../host/host-service';
import { ActivatedRoute } from '@angular/router';
import { hostResponseData } from '../../host/hostResponseData';

@Component({
  selector: 'app-host-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent implements OnInit {
  testResponse: hostResponseData
  name: string;
  mapname: string
  _request: string
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _hostService: HostService) {
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
    this._hostService.getMapDetail(this.name, this.mapname)
      .subscribe(mapDetail =>
        this.request = mapDetail.request,
        error => this.errorMessage = <any>error)
  }

  onSubmit(): void {
    console.log('submitting...')
    this.errorMessage = null
    this.testResponse = null
    this._hostService.submitRequest(this.name, this.request)
      .subscribe(response => this.testResponse = response,
        error => this.errorMessage = <any>error)
  }

}
