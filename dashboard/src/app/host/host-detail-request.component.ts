import { Component, OnInit } from '@angular/core';
import { HostService } from './host-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-host-detail-request',
  templateUrl: './host-detail-request.component.html',
  styleUrls: ['./host-detail-request.component.css']
})
export class HostDetailRequestComponent implements OnInit {
  request: string;
  name: string;
  file: string;
  errorMessage: string;
  constructor(private _route: ActivatedRoute, private _hostService: HostService) {
    this.name = this._route.snapshot.paramMap.get('name')
    this.file = this._route.snapshot.paramMap.get('file')
  }

  ngOnInit() {
    this._hostService.getHostRequestFileContent(this.name, this.file)
      .subscribe(request => this.request = request,
        error => this.errorMessage = <any>error)
  }

}
