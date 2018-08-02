import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../ApiService';
import { Service } from '../../models/Service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-service.new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {
  title: string;
  name: string;
  service: Service;
  errorMessage: string;
  statusMessage: string

  model = new Service(
    '',
    '',
    []);
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService,
    private _location: Location) {
    this.title = 'Create new Service'
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('adding new:' + this.model.name);
    this.errorMessage = '';
    this._apiService.addNewService(this.model)
      .subscribe(msg => this._router.navigate(['/']),
        error => {
          if (error.error.status === 422) {
            this.errorMessage = this.model.name + ' already exists'
          } else {
            this.errorMessage = error.message
          }
        }
      );
  }

  backClicked() {
    this._location.back();
  }
} 