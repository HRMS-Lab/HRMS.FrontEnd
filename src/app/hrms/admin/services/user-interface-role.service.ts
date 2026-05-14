import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { ActivityPayload } from '../models/User.model';
import { UserInterfaceRoleInfo, UserInterfaceRolePayload } from '../models/UserInterfaceRole.model';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceRoleService {

  private readonly _http = inject(HttpClient);

  load() {
    const req = this._http
      .get<UserInterfaceRoleInfo[]>(Endpoints.GET_USER_INTERFACE_ROLE)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  add(UserInterfaceRole: FormData) {
    const req = this._http
      .post<UserInterfaceRolePayload>(
        Endpoints.CREATE_USER_INTERFACE_ROLE,
        UserInterfaceRole
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  ChangeActivity(id: number, Activity: boolean) {
    const req = this._http
      .put<ActivityPayload>(
        `${Endpoints.CHANGE_ROLE_UI_ACTIVITY + id}`,
        {
          active: Activity
        }
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
