import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constans/endpoints';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    BranchesInfo,
    BranchesInfoDetails,
    BranchesInfoPayload,
} from '../models/branches.model';

@Injectable({
    providedIn: 'root',
})
export class BranchesService {
    private readonly _http = inject(HttpClient);

    loadBranchess(id: number) {
        const req = this._http
            .get<BranchesInfo[]>(Endpoints.BRANCHE + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadBranchessById(orgId: number, id: number) {
        const req = this._http
            .get<BranchesInfoDetails>(Endpoints.GETBRANCH + id + '/' + orgId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addBranches(Branches: BranchesInfoPayload) {
        const req = this._http
            .post<BranchesInfoPayload>(Endpoints.CREATEBRANCHES, Branches)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateBranches(id: number, Branches: BranchesInfoPayload) {
        const req = this._http
            .put<BranchesInfoPayload>(
                `${Endpoints.UPDATEBRANCHES}/${id}`,
                Branches
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
