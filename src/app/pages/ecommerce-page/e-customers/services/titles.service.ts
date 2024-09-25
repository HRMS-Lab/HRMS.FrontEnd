import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrgChart, TitleInfo, TitleInfoPayload } from '../model/titles.model';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    private readonly _http = inject(HttpClient);

    loadOrgChart(orgId:number) {
        const req = this._http
            .get<OrgChart[]>(Endpoints.ORGCHART + orgId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadTitles() {
        const req = this._http
            .get<TitleInfo[]>(Endpoints.TITLES)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadTitleById( id: number) {
        const req = this._http
            .get<TitleInfo>(Endpoints.GETTITLE + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addTitle(title: TitleInfoPayload) {
        const req = this._http
            .post<TitleInfoPayload>(Endpoints.CREATETITLES, title)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateTitle(id: number, title: TitleInfoPayload) {
        const req = this._http
            .put<TitleInfoPayload>(
                `${Endpoints.UPDATETITLES}/${id}`,
                title
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
