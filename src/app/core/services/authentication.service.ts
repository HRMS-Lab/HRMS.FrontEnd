import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = environment.apiUrl;
  baseUrl: string = `/token`;  

  login(loginData : any) {
    return this.http.post<any>(this.apiUrl + this.baseUrl, loginData)
      .pipe(map(res => {
        // debugger;
        if (res.token) {
          localStorage.setItem('token', res.token);
          // localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          //localStorage.setItem('lang', 'ar-sa');
          return res;
        }

      }));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
