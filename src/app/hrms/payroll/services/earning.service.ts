import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../core/constans/endpoints';
import { EarningInfo, EarningPayload } from '../models/earning.model';
import { lastValueFrom, take } from 'rxjs';
import { ActivityPayload } from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class EarningService {
  private readonly _http = inject(HttpClient);

  loadEarning(orgId:number) {
    const req = this._http
      .get<EarningInfo[]>(Endpoints.GET_EARNING + orgId)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadEarningId() {
    const req = this._http
      .get<EarningInfo>(Endpoints.GET_EARNING_ID)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addEarning(Earning: FormData) {
    const req = this._http
      .post<EarningPayload>(
        Endpoints.CREATE_EARNING,
        Earning
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateEarning(Earning: any) {
    const req = this._http
      .put<ActivityPayload>(
        Endpoints.UPDATE_EARNING,
        Earning
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
