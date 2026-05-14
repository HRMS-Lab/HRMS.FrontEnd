import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //get all Data
  get(url:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + url);
  }

  //get Data by id
  getById(url:string, userId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + url, userId);
  }

  //post Data
  post(url:string, data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + url, data);
  }

  //put Data
  put(url:string, data:any): Observable<any> {
    return this.http.put<any>(this.apiUrl + url, data);
  }

  //delete Data
  delete(url:string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + url);
  }
}
