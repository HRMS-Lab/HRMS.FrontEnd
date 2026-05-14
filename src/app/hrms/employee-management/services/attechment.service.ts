import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take, lastValueFrom } from 'rxjs';
import { AttachmentInfo, AttachmentInfoDetails, AttachmentInfoPayload } from '../models/attechment.model';
import { Endpoints } from '../../../core/constans/endpoints';
@Injectable({
    providedIn: 'root'
})
export class AttechmentService {

    private readonly _http = inject(HttpClient);
    
    loadAttachmemts(id: number) {
        const req = this._http
            .get<AttachmentInfo[]>(Endpoints.ATTECHMENTS + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadAttachmemtsTypes(id: number) {
        const req = this._http
            .get<any[]>(Endpoints.ATTECHMENTSTYPES + id)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadAttachmemtsById(orgId: number, id: number) {
        const req = this._http
            .get<AttachmentInfoDetails>(Endpoints.GETATTECHMENT + id + '/' + orgId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    loadAttachmemtsByEmployeeId(employeeId: number) {
        const req = this._http
            .get<AttachmentInfo[]>(Endpoints.GETATTECHMENTBYEMPOLYEE + employeeId)
            .pipe(take(1));
        return lastValueFrom(req);
    }
    addAttachmemt(Attachmemt: FormData) {
        const req = this._http
            .post<AttachmentInfoPayload>(
                Endpoints.CREATEATTECHMENTS,
                Attachmemt
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
    updateAttachmemt(id: number, Attachmemt: FormData) {
        const req = this._http
            .put<AttachmentInfoPayload>(
                `${Endpoints.UPDATEATTECHMENTS}/${id}`,
                Attachmemt
            )
            .pipe(take(1));
        return lastValueFrom(req);
    }
    deleteAttachmemt(id: number) {
        const req = this._http
            .delete(
                `${Endpoints.DELETEATTECHMENTS}/${id}`)
            .pipe(take(1));
        return lastValueFrom(req);
    }
}
