import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, lastValueFrom } from 'rxjs';
import { EmployeeProjectInfo, EmployeeProjectInfoPayload } from '../models/employee-project.model';
import { Endpoints } from '../../../core/constans/endpoints';

@Injectable({
    providedIn: 'root'
})
export class EmployeeProjectService {

    private readonly _http = inject(HttpClient);

    loadEmployeeProject(id?: number, projectId?: number, employeeId?: number) {
        let url = Endpoints.GET_EMPLOYEE_PROJECT;
        const filters: string[] = [];
        if (id)
            filters.push(`Id =${id}`);
        if (projectId)
            filters.push(`projectId=${projectId}`);
        if (employeeId)
            filters.push(`employeeId=${employeeId}`);
        if (filters.length > 0)
            url += '?' + filters.join('&');
        
        const req = this._http
            .get<EmployeeProjectInfo[]>(url)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addEmployeeProject(EmployeeProject: EmployeeProjectInfoPayload) {
        const req = this._http
            .post<EmployeeProjectInfoPayload>(Endpoints.CREATE_EMPLOYEE_PROJECT, EmployeeProject)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateEmployeeProject(id: number, EmployeeProject: EmployeeProjectInfoPayload) {
        const req = this._http
            .put<EmployeeProjectInfoPayload>(
                `${Endpoints.UPDATE_EMPLOYEE_PROJECT}/${id}`,
                EmployeeProject
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
