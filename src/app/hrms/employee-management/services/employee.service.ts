import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom, Observable, catchError, of } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { EmployeeInfo, TitlesInfo, EmployeeInfoPayload } from '../../../pages/ecommerce-page/e-orders/models/employee.model';
import { EmployeeCounts } from '../models/employee.model';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeInternalService {

  private readonly _http = inject(HttpClient);
  private readonly _sharedService = inject(SharedService);

  loadEmployees(pageNumber: number, pageSize: number, filter?: string) {
    const url = `${Endpoints.EMPLOYEES}/${pageNumber}/${pageSize}${filter ? `/filter/${filter}` : ''}`;

    const req = this._http.get<EmployeeInfo[]>(url).pipe(take(1));
    return lastValueFrom(req);
  }
  loadEmployeesObservable(pageNumber: number, pageSize: number, filter?: string): Observable<any> {
    // Make sure the method returns an Observable, not a Promise
    const url = `${Endpoints.EMPLOYEES}/${pageNumber}/${pageSize}${filter ? `/filter/${filter}` : ''}`;
    return this._http.get<any>(url);
  }
  loadEmployeesRegistryq(employeeCode?: string, fullName?: string, nationalId?: string, phone?: string) {
    let url = `${Endpoints.GET_EMPLOYEE_REGISTRY}?orgId=${this._sharedService.getOrgId()}`;
    if (employeeCode != null) url += `&employeeCode=${employeeCode}`;
    if (fullName != null) url += `&fullName=${fullName}`;
    if (nationalId != null) url += `&nationalId=${nationalId}`;
    if (phone != null) url += `&phone=${phone}`;

    const req = this._http.get<EmployeeInfo[]>(url).pipe(take(1));
    return lastValueFrom(req);
  }

  loadEmployeesRegistry(employeeCode?: string, fullName?: string, nationalId?: string, phone?: string): Promise<EmployeeInfo[]> {
    let params = new HttpParams()
      .set('orgId', this._sharedService.getOrgId());

    // Add optional parameters
    if (employeeCode?.trim()) params = params.set('employeeCode', employeeCode);
    if (fullName?.trim()) params = params.set('fullName', fullName);
    if (nationalId?.trim()) params = params.set('nationalId', nationalId);
    if (phone?.trim()) params = params.set('phone', phone);

    const url = `${Endpoints.GET_EMPLOYEE_REGISTRY}`;
    const req = this._http.get<EmployeeInfo[]>(url, { params }).pipe(
      take(1),
      catchError(error => {
        console.error('Failed to load employees:', error);
        return of([]);
      })
    );

    return lastValueFrom(req);
  }

  loadEmployeeCounts(orgId: number) {
    const req = this._http
      .get<EmployeeCounts[]>(Endpoints.GET_EMPLOYEE_COUNTS + orgId)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadTitles() {
    const req = this._http
      .get<TitlesInfo[]>(Endpoints.TITLES)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadEmployeesById(id: number) {
    const req = this._http
      .get<EmployeeInfo>(Endpoints.GETEMPLOYEE + id)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addEmployee(Employee: EmployeeInfoPayload) {
    const req = this._http
      .post<EmployeeInfoPayload>(Endpoints.CREATEEMPLOYEES, Employee)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateEmployee(id: number, Employee: EmployeeInfoPayload) {
    const req = this._http
      .put<EmployeeInfoPayload>(
        `${Endpoints.UPDATEEMPLOYEES}/${id}`,
        Employee
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }

  private getFilterParams(filters: {
    employeeCode?: string;
    fullName?: string;
    nationalId?: string;
    phone?: string;
  }): HttpParams {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value != null && value.trim() !== '') {
        params = params.set(key, value);
      }
    });

    return params;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Consider using a proper logging service here
      return of(result as T);
    };
  }
}
