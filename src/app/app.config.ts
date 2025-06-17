import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { spinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptors([
      tokenInterceptor,
      spinnerInterceptor
    ])),
    provideRouter(routes),
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ]
};
