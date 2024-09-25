import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeInfo, EmployeeInfoPayload, TitlesInfo } from '../models/employee.model';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private readonly _http = inject(HttpClient);

    loadEmployees() {
        const req = this._http
            .get<EmployeeInfo[]>(Endpoints.EMPLOYEES)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadTitles() {
        const req = this._http
            .get<TitlesInfo[]>(Endpoints.TITLES)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadEmployeesById( id: number) {
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
}
