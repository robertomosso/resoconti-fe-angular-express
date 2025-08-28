import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

import { SpinnerService } from './shared/services/spinner.service';
import { HeaderComponent } from "./core/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatProgressSpinnerModule,
    AsyncPipe,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public spinnerService: SpinnerService) {}
  
}
