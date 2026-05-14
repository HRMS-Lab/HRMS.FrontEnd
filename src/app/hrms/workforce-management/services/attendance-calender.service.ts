import { inject, Injectable } from '@angular/core';
import {  CalenderInfo, CalenderPayload } from '../models/attendance-calender.model';
import { HttpClient } from '@angular/common/http';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AttendanceCalenderService {
private readonly _http = inject(HttpClient);

  loadCalender() {
    const req = this._http
      .get<CalenderInfo[]>(Endpoints.GET_CALENDER)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  
    updateCalender(calender: CalenderPayload) {
      const req = this._http
        .put<any>(Endpoints.UPDATE_CALENDER, calender)
        .pipe(take(1));
      return lastValueFrom(req);
    }
}
