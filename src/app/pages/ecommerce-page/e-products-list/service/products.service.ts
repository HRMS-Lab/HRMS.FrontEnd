import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    DepartmentInfo,
    DepartmentInfoDetails,
    DepartmentInfoPayload,
    OragnizationInfo,
} from '../models/products.model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly _http = inject(HttpClient);

    loadOrganization() {
        const req = this._http
            .get<OragnizationInfo[]>(Endpoints.ORGANIZATION)
            .pipe(take(1));
        return lastValueFrom(req);
    }

    loadDepartments(id: number) {
        const req = this._http
            .get<DepartmentInfo[]>(Endpoints.DEPARTMENTS + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadDepartmentsById(orgId: number, id: number) {
        const req = this._http
            .get<DepartmentInfoDetails>(Endpoints.GETDEPARTMENT + id + '/' + orgId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addDepartment(department: DepartmentInfoPayload) {
        const req = this._http
            .post<DepartmentInfoPayload>(
                Endpoints.CREATEDEPARTMENTS,
                department
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateDepartment(id: number, department: DepartmentInfoPayload) {
        const req = this._http
            .put<DepartmentInfoPayload>(
                `${Endpoints.UPDATEDEPARTMENTS}/${id}`,
                department
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
