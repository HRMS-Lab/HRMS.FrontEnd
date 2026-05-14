import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { ActivityPayload } from '../models/shared.model';
import { TemplateInfo, TemplatePayload } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private readonly _http = inject(HttpClient);

  get(orgId: number, headId?: number) {
    let url = `${Endpoints.GET_TEMPLATE}${orgId}`;
    if(headId != undefined)
      url += `$&payTempHeadId=${headId}`;

    const req = this._http
      .get<TemplateInfo[]>(url)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  create(Template: FormData) {
    const req = this._http
      .post<TemplatePayload>(
        Endpoints.CREATE_TEMPLATE,
        Template
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  update(Template: any) {
    const req = this._http
      .put<ActivityPayload>(
        Endpoints.UPDATE_TEMPLATE,
        Template
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
