import { HttpEvent, HttpHandler, HttpRequest, HttpContext, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../shared/component/loader/loader.service';
import { inject } from '@angular/core';

export function LoaderInterceptor (
    req: HttpRequest<any>, 
    next: HttpHandlerFn, 
  ): Observable<HttpEvent<any>> {
    // Use HttpContext to inject LoaderService
    const loaderService = inject(LoaderService);
  
    // Show loader
    loaderService.turnLoadingOn();
  
    return next(req).pipe(
      finalize(() => {
        // Hide loader after request is completed
        loaderService.turnLoadingOff();
      })
    );
  };
