import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { UserPayload, ActivityPayload, UserInfo } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http = inject(HttpClient);

  loadUsers(orgId: number) {
    const req = this._http
      .get<UserInfo[]>(Endpoints.GET_USER + orgId)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addUser(User: FormData) {
    const req = this._http
      .post<UserPayload>(
        Endpoints.CREATE_USER,
        User
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  ChangeActivity(id: number, Activity: boolean) {
    const req = this._http
      .put<ActivityPayload>(
        `${Endpoints.CHANGE_ACTIVITY + id}`,
        {
          active: Activity
        }
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
