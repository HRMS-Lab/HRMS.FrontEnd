import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../core/constans/endpoints';
import { SysInfluneInfo } from '../models/sysInflunes.model';
import { take, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SysInfluneService {

  private readonly _http = inject(HttpClient);

  get(orgId: number) {
    let url = `${Endpoints.GET_SYS_INFLUNES}${orgId}`;
    const req = this._http
      .get<SysInfluneInfo[]>(url)
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
