import { inject, Injectable } from '@angular/core';
import { ProjectInfo, ProjectInfoPayload } from '../models/Project.model';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../core/constans/endpoints';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly _http = inject(HttpClient);

    loadProjects(id: number) {
        const req = this._http
            .get<ProjectInfo[]>(Endpoints.GET_PROJECT + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addProject(Project: ProjectInfoPayload) {
        const req = this._http
            .post<ProjectInfoPayload>(Endpoints.CREATE_PROJECT, Project)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateProject(id: number, Project: ProjectInfoPayload) {
        const req = this._http
            .put<ProjectInfoPayload>(
                `${Endpoints.UPDATE_PROJECT}/${id}`,
                Project
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
