import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { OrgChartInfo } from '../models/organization-chart.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationChartService {

  private readonly _http = inject(HttpClient);

  get(orgId: number) {
    const req = this._http
      .get<OrgChartInfo[]>(Endpoints.ORGCHART + orgId)
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
