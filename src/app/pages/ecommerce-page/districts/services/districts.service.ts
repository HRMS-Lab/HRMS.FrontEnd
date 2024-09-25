import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    DistrictInfoDetails,
    DistrictInfoPayload,
} from '../models/districts.model';

@Injectable({
    providedIn: 'root',
})
export class DistrictsService {
    private readonly _http = inject(HttpClient);

    loadDistrictsById(regionId: number, orgId: number) {
        const req = this._http
            .get<DistrictInfoDetails>(
                Endpoints.GETDISTRICT + regionId + '/' + orgId
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addDistrict(District: any) {
        const req = this._http
            .post<DistrictInfoPayload>(Endpoints.CREATEDISTRICT, District)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateDistrict(id: number, District: any) {
        const req = this._http
            .put<DistrictInfoPayload>(
                `${Endpoints.UPDATEDISTRICT}/${id}`,
                District
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
