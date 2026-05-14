import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { UserInterfaceInfo, UserInterfacePayload } from '../models/UserInterface.model';
import { ActivityPayload } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  private readonly _http = inject(HttpClient);

  loadUserInterfaces() {
    const req = this._http
      .get<UserInterfaceInfo[]>(Endpoints.GET_USER_INTERFACE)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  loadUserInterfaceId() {
    const req = this._http
      .get<UserInterfaceInfo>(Endpoints.GET_USER_INTERFACE_ID)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addUserInterface(UserInterface: FormData) {
    const req = this._http
      .post<UserInterfacePayload>(
        Endpoints.CREATE_USER_INTERFACE,
        UserInterface
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  ChangeUiActivity(id: number, Activity: boolean) {
    const req = this._http
      .put<ActivityPayload>(
        `${Endpoints.CHANGE_UI_ACTIVITY + id}`,
        {
          active: Activity
        }
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
