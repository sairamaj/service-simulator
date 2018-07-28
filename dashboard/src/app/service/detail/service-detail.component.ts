import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../ApiService';
import { Service } from '../../models/Service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-service.detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  name: string;
  service: Service;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService,
    private _location: Location) {
    this.name = this._route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this._apiService.getServiceDetails(this.name)
      .subscribe(service => this.service = service,
        error => this.errorMessage = <any>error);
  }

  onTest(requestFile: string): void {
    this._router.navigate(['/services/' + this.name + '/' + requestFile + '/test']);
  }

  onEdit(mapName: string): void {
    this._router.navigate(['services/' + this.name + '/newresponse/' + mapName]);
  }

  onNew(): void {
    this._router.navigate(['services/' + this.name + '/newresponse']);

  }


  onLastServedRequests(): void {
    this._router.navigate(['services/' + this.name + '/processedrequests']);
  }

  backClicked() {
    this._location.back();
  }
} 