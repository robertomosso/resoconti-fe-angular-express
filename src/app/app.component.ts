import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatProgressSpinnerModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  constructor(public spinnerService: SpinnerService) {}
}
