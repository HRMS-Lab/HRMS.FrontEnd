import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OragnizationInfo, OrganizationInfo, OrganizationInfoDetails, OrganizationInfoPayload } from '../model/organizations.model';

@Injectable({
    providedIn: 'root',
})
export class OrganizationsService {
    private readonly _http = inject(HttpClient);

    loadOrganization() {
        const req = this._http
            .get<OragnizationInfo[]>(Endpoints.ORGANIZATION)
            .pipe(take(1));
        return lastValueFrom(req);
    }


    loadOrganizationsById(id: number) {
        const req = this._http
            .get<OrganizationInfoDetails>(Endpoints.GETORGANIZATION + id )
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addOrganization(Organization: FormData) {
        const req = this._http
            .post<OrganizationInfoPayload>(
                Endpoints.CREATEORGANIZATIONS,
                Organization
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateOrganization(id: number, Organization: FormData) {
        const req = this._http
            .put<OrganizationInfoPayload>(
                `${Endpoints.UPDATEORGANIZATIONS}/${id}`,
                Organization
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
