import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export function BasicAuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    //Get Token data from local storage
    let token = localStorage.getItem('token');
    //let langCode = localStorage.getItem('lang');
    if (token) {
        // if(langCode == null)
        //     localStorage.setItem('lang', 'ar-sa');

        request = request.clone({
            setHeaders: {
                //'Content-Type': 'application/json',
                //'Accept-Language': langCode,
                'Authorization': 'Bearer ' + token,
            }
        });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next(request);
}
