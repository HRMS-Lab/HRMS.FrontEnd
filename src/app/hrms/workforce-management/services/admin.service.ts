import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { AdminInfo } from '../models/admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private readonly _http = inject(HttpClient);

    loadAdmins(orgId: number) {
        const req = this._http
            .get<AdminInfo[]>(Endpoints.GET_ADMIN + orgId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
}