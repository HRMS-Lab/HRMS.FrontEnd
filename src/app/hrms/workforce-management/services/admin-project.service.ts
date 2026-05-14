import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { Endpoints } from '../../../core/constans/endpoints';
import { AdminProjectInfo, AdminProjectPayload, ChangeStatusPayload } from '../models/admin-project.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectService {

  private readonly _http = inject(HttpClient);

  loadAdminProjects(adminId?: number, projectId?: number) {
    let url = Endpoints.GET_ADMIN_PROJECT;
    const filters: string[] = [];
    if (adminId)
      filters.push(`adminId=${adminId}`);
    if (projectId)
      filters.push(`projectId=${projectId}`);
    if (filters.length > 0)
      url += '?' + filters.join('&');

    const req = this._http
      .get<AdminProjectInfo[]>(url)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  addAdminProject(AdminProject: AdminProjectPayload) {
    const req = this._http
      .post<AdminProjectPayload>(Endpoints.CREATE_ADMIN_PROJECT, AdminProject)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  updateAdminProject(AdminProject: AdminProjectPayload) {
    const req = this._http
      .patch<AdminProjectPayload>(Endpoints.UPDATE_ADMIN_PROJECT, AdminProject)
      .pipe(take(1));
    return lastValueFrom(req);
  }
  ChangeStatus(Project: ChangeStatusPayload) {
    const req = this._http
      .put<ChangeStatusPayload>(Endpoints.CHANGE_STATUS, Project)
      .pipe(take(1));
    return lastValueFrom(req);
  }
}
