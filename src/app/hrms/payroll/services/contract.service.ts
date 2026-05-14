import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../core/constans/endpoints';
import { ContractInfo, ContractPayload } from '../models/contract.model';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private readonly _http = inject(HttpClient);

  get(orgId: number, tempHeadId?: number) {
    let url = `${Endpoints.GET_CONTRACT}${orgId}`;
    if (tempHeadId != undefined)
      url += `&payTempHeadId=${tempHeadId}`;

    const req = this._http
      .get<ContractInfo[]>(url)
      .pipe(take(1));
    return lastValueFrom(req);
  }

  create(Data: FormData) {
    const req = this._http
      .post<ContractPayload>(
        Endpoints.CREATE_CONTRACT,
        Data
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
