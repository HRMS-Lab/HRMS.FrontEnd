import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, GuardResult, MaybeAsync } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const token = localStorage.getItem('token');
        const screenId = route.data['screenId'];
        console.log(screenId);

        if (token) {
            const tokenObj: any = jwtDecode(token);
            const screenList = tokenObj.AllowedPages;
            const isAccess = screenList.includes(screenId);
            if(!isAccess && screenId){
                this.router.navigate(['/not-found']);
                return false;
            }

            return true; // Return true if token exists, false otherwise
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}