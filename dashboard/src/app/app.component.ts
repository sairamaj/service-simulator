import { Component } from '@angular/core';
import { HostService } from './host/host-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [HostService]
})
export class AppComponent {
  title = 'app';
}
