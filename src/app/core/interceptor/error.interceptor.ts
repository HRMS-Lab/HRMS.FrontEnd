import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { AuthenticationService } from './authentication.service';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

export function ErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // Inject the Router using the inject() function
    const router = inject(Router);
    const toastrService = inject(ToastrService);
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            debugger;
            // Check if it's a client-side or server-side error
            let errorMessage:any;

            // Handling 401 (Unauthorized) and 403 (Forbidden) errors
            if (error.status === 401 || error.status === 403) {
                // If the error is due to invalid credentials (401 or 403)
                if (router.url.includes('login') && error.error) {
                    // Return the specific error message from the server
                    return throwError(() => new Error(error.error));
                } else {
                    // Clear local storage and navigate to the login page
                    localStorage.clear();
                    router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
                    return throwError(() => new Error('Unauthorized access. Redirecting to login.'));
                }
            }

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = {
                    error: error.error,
                    status: error.status
                };
            } else {
                // Server-side error
                errorMessage = {
                    error: error.error,
                    status: error.status
                };
            }

            // Log the error to the console
            console.error('HTTP Error occurred:', errorMessage);
            
            // Display the error message using Toastr
            toastrService.error(errorMessage?.error?.error, `Error ${errorMessage?.status}`, { timeOut: 5000 });

            // Optionally, you could show a user-friendly error message here (e.g., with a Snackbar or Toastr)

            // Re-throw the error for further handling in your components or services
            return throwError(() => new Error(errorMessage));
        })
    );
}
