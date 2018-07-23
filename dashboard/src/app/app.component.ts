import { Component } from '@angular/core';
import { ApiService } from './service/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ApiService]
})
export class AppComponent {
  title = 'app';
}
