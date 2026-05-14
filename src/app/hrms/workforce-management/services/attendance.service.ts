import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { AttendanceRecordPayload, AttendanceTypeInfo, EmployeeAttendanceInfo } from '../models/attendance.module';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly _http = inject(HttpClient);

  loadAttendanceType() {
    const req = this._http
      .get<AttendanceTypeInfo[]>(Endpoints.GET_ATTENDANCE_TYPE)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadEmployeeAttendance(empId: number, attenTypeId?: number, fromDate?: string, toDate?: string) {
    let url = Endpoints.GRT_EMPLOYEE_ATTENDANCE + `/${empId}`;
    const filters: string[] = [];
    if (attenTypeId)
      filters.push(`attenTypeId=${attenTypeId}`);
    if (fromDate)
      filters.push(`fromDate=${fromDate}`);
    if (toDate)
      filters.push(`toDate=${toDate}`);
    if (filters.length > 0)
      url += '?' + filters.join('&');

    const req = this._http
      .get<EmployeeAttendanceInfo[]>(url)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addAttendance(attendance: AttendanceRecordPayload) {
    const req = this._http
      .post<AttendanceRecordPayload>(Endpoints.CREATE_ATTENDANCE, attendance)
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
