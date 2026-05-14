import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { RoleInfo, RolePayload } from '../models/role.model';
import { ActivityPayload } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly _http = inject(HttpClient);

  loadRoles() {
    const req = this._http
      .get<RoleInfo[]>(Endpoints.GET_ROLES)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadRoleId() {
    const req = this._http
      .get<RoleInfo>(Endpoints.GET_ROLE_ID)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addRole(Role: FormData) {
    const req = this._http
      .post<RolePayload>(
        Endpoints.CREATE_ROLE,
        Role
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateRole(id: number, Role: FormData) {
    const req = this._http
      .put<ActivityPayload>(
        `${Endpoints.UPDATE_ROLE + id}`,
        Role
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
