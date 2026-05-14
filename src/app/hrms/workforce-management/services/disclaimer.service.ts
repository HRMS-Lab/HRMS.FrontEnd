import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DisclaimerInfo, DisclaimerPayload, DisclaimerTypeInfo } from '../models/disclaimer.model';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DisclaimerService {

  private readonly _http = inject(HttpClient);

  loadDisclaimerType(orgId: number) {
    const req = this._http
      .get<DisclaimerTypeInfo[]>(Endpoints.GET_DISCLAIMER_TYPE + `?orgId=${orgId}`)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadEmployeeDisclaimer(orgId: number, empId:number) {
    const req = this._http
      .get<DisclaimerInfo[]>(Endpoints.GET_DISCLAIMER + `${orgId}?employeeId=${empId}`)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addDisclaimer(Disclaimer: DisclaimerPayload) {
    const req = this._http
      .post<DisclaimerPayload>(Endpoints.CREATE_DISCLAIMER, Disclaimer)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateDisclaimer(id:number, Disclaimer: DisclaimerInfo) {
    const req = this._http
      .put<DisclaimerInfo>(Endpoints.UPDATE_DISCLAIMER + id, Disclaimer)
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
