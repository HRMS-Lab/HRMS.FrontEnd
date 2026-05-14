import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TitleInfo, TitlePayload } from '../models/title.model';
import { Endpoints } from '../../../core/constans/endpoints';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private readonly _http = inject(HttpClient);

  get() {
    const req = this._http
      .get<TitleInfo[]>(Endpoints.TITLES)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  getById(id: number) {
    const req = this._http
      .get<TitleInfo>(Endpoints.GETTITLE + id)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  create(title: TitlePayload) {
    const req = this._http
      .post<TitlePayload>(Endpoints.CREATETITLES, title)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  update(id: number, title: TitlePayload) {
    const req = this._http
      .put<TitlePayload>(
        `${Endpoints.UPDATETITLES}/${id}`,
        title
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
