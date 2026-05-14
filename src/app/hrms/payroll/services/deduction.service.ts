import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { ActivityPayload } from '../models/shared.model';
import { DeductionInfo, DeductionPayload } from '../models/deduction.model';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {
private readonly _http = inject(HttpClient);

  loadDeduction(orgId:number) {
    const req = this._http
      .get<DeductionInfo[]>(Endpoints.GET_DEDUCTION + orgId)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadDeductionId() {
    const req = this._http
      .get<DeductionInfo>(Endpoints.GET_DEDUCTION_ID)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addDeduction(Deduction: FormData) {
    const req = this._http
      .post<DeductionPayload>(
        Endpoints.CREATE_DEDUCTION,
        Deduction
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateDeduction(Deduction: any) {
    const req = this._http
      .put<ActivityPayload>(
        Endpoints.UPDATE_DEDUCTION,
        Deduction
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
