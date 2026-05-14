import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { CalculationHeaderPayload, CalculationInfo, CalculationPayload } from '../models/calculation.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private readonly _http = inject(HttpClient);

  get(orgId: number, payClacHeaderId?: number, description?: number, month?: number, year?: number, posted?: boolean) {
    // ?orgId=1&payClacHeaderId=1&description=11&month=1&year=1&posted=true
    let url = `${Endpoints.GET_CALCULATION}?orgId=${orgId}`;
    if (payClacHeaderId != undefined)
      url += `&payClacHeaderId=${payClacHeaderId}`;
    if (description != undefined)
      url += `&description=${description}`;
    if (month != undefined)
      url += `&month=${month}`;
    if (year != undefined)
      url += `&year=${year}`;
    if (posted != undefined)
      url += `&posted=${posted}`;

    const req = this._http
      .get<CalculationInfo[]>(url)
      .pipe(take(1));
    return lastValueFrom(req);
  }

  createHeader(Data: FormData) {
    const req = this._http
      .post<CalculationHeaderPayload>(
        Endpoints.CREATE_CALCULATION_HEADER,
        Data
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }

  createCalculation(Data: CalculationPayload) {
    const req = this._http
      .post<CalculationPayload>(
        Endpoints.CREATE_CALCULATION,
        Data
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
