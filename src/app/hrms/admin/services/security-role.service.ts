import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { SecurityRoleInfo, SecurityRolePayload } from '../models/SecurityRole.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityRoleService {

  private readonly _http = inject(HttpClient);

  loadSecurityRoles() {
    const req = this._http
      .get<SecurityRoleInfo[]>(Endpoints.GET_SECURITY_ROLE)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addSecurityRole(SecurityRole: FormData) {
    const req = this._http
      .post<SecurityRolePayload>(
        Endpoints.CREATE_SECURITY_ROLE,
        SecurityRole
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateSecurityRole(id: number, SecurityRole: FormData) {
    const req = this._http
      .put<SecurityRolePayload>(
        `${Endpoints.UPDATE_SECURITY_ROLE + id}`,
        SecurityRole
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
