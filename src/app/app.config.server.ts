import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';

const serverConfig: ApplicationConfig = {
    providers: [
        provideServerRendering(),
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);