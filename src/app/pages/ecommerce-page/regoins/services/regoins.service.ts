import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegoinInfoDetails, RegoinInfoPayload } from '../models/regoins.model';

@Injectable({
    providedIn: 'root',
})
export class RegoinService {
    private readonly _http = inject(HttpClient);

    loadRegoinsById(id: number) {
        const req = this._http
            .get<RegoinInfoDetails>(Endpoints.GETREGOIN + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addRegoin(Regoin: FormData) {
        const req = this._http
            .post<RegoinInfoPayload>(Endpoints.CREATEREGOIN, Regoin)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateRegoin(id: number, Regoin: FormData) {
        const req = this._http
            .put<RegoinInfoPayload>(`${Endpoints.UPDATEREGOIN}/${id}`, Regoin)
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
