import { Component, OnInit } from '@angular/core';
import { HostService } from './host-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-host-detail-response',
  templateUrl: './host-detail-response.component.html',
  styleUrls: ['./host-detail-response.component.css']
})
export class HostDetailResponseComponent implements OnInit {
  response: string;
  name: string;
  file: string;
  errorMessage: string;
  constructor(private _route: ActivatedRoute, private _hostService: HostService) {
    this.name = this._route.snapshot.paramMap.get('name')
    this.file = this._route.snapshot.paramMap.get('file')
  }

  ngOnInit() {
    this._hostService.getHostResponseFileContent(this.name, this.file)
      .subscribe(response => this.response = response,
        error => this.errorMessage = <any>error)
  }

}
