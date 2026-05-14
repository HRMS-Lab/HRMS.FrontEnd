import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { SecurityGroupInfo, SecurityGroupPayload, UpdateSecurityGroupPayload } from '../models/SecurityGroups.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupService {

  private readonly _http = inject(HttpClient);

  loadSecurityGroups() {
    const req = this._http
      .get<SecurityGroupInfo[]>(Endpoints.GET_SECURITY_GROUP)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addSecurityGroup(SecurityGroup: FormData) {
    const req = this._http
      .post<SecurityGroupPayload>(
        Endpoints.CREATE_SECURITY_GROUP,
        SecurityGroup
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateSecurityGroup(SecurityGroup: UpdateSecurityGroupPayload) {
    const req = this._http
      .put<UpdateSecurityGroupPayload>(
        `${Endpoints.UPDATE_SECURITY_GROUP}`,
        SecurityGroup
      )
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
