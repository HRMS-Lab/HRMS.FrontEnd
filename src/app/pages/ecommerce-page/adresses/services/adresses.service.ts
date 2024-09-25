import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    AdressesInfoDetails,
    AdressesInfoPayload,
} from '../models/adresses.model';

@Injectable({
    providedIn: 'root',
})
export class AdressesService {
    private readonly _http = inject(HttpClient);

    loadAAdresssById(orgId: number, id: number) {
        const req = this._http
            .get<AdressesInfoDetails>(Endpoints.GETADRESSES + id + '/' + orgId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addAdress(ADRESS: any) {
        const req = this._http
            .post<AdressesInfoPayload>(Endpoints.CREATEADRESSES, ADRESS)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateAdress(id: number, ADRESS: any) {
        const req = this._http
            .put<AdressesInfoPayload>(
                `${Endpoints.UPDATEADRESSES}/${id}`,
                ADRESS
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
