import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { BasicAuthInterceptor } from './core/interceptor/basic-auth.interceptor';
import { LoaderInterceptor } from './core/interceptor/loader.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(withInterceptors([ErrorInterceptor])),
        provideHttpClient(withInterceptors([BasicAuthInterceptor])),
        provideHttpClient(withInterceptors([LoaderInterceptor])),
        provideClientHydration(), 
        //provideAnimationsAsync(), 
        provideAnimationsAsync(),
        provideToastr()
    ]
};