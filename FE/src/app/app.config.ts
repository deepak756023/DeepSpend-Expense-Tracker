import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/material';
import { tokenInterceptor } from './interceptor/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(withInterceptors([tokenInterceptor])),
  provideRouter(routes),
  provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false || 'none'
      }
    }
  })

  ]
};
