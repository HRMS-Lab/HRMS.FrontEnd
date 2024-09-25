import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  finalize,
  Observable,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loadingSubject$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this._loadingSubject$.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => {
        this.turnLoadingOn();
      }),
      concatMap(() => obs$),
      finalize(() => {
        this.turnLoadingOff();
      }),
    );
  }

  private turnLoadingOn() {
    this._loadingSubject$.next(true);
  }

  private turnLoadingOff() {
    this._loadingSubject$.next(false);
  }
}
