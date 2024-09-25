import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, shareReplay, throwError } from 'rxjs';
import { LoaderService } from '../component/loader/loader.service';


interface HttpOptions {
  params: Record<string | number, unknown>;
  showLoader: boolean;
  handleError: boolean;
  cache: boolean;
  suffix: string;
  endWithSlash: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly loaderService = inject(LoaderService);
  private readonly defaultOptions = inject(HTTP_SERVICE_OPTIONS);
  private readonly requestCacheMap = new Map<string, Observable<unknown>>();

  /**
   * Sends an HTTP GET request to the specified URL and returns an Observable of the response body.
   * with Caching option default (true)
   *
   * @param {string} url - The URL to send the request to.
   * @param {HttpOptions} options - (Optional) The options for the HTTP request.
   * @return {Observable<T>} An Observable of the response body.
   */
  get<T = unknown>(url: string, options?: HttpOptions): Observable<T> {
    const mergedOptions = this._mergeDefaultOptions(options);
    if (mergedOptions.endWithSlash) {
      url = url.endsWith('/') ? url : url + '/';
      if (mergedOptions.suffix) {
        mergedOptions.suffix = mergedOptions.suffix.endsWith('/')
          ? mergedOptions.suffix
          : mergedOptions.suffix + '/';
      }
    }
    const showLoader = mergedOptions.showLoader ?? true;
    const key = this._generateKey(url, mergedOptions.params);
    let request = this.http.get<T>(
      url + mergedOptions.suffix,
      mergedOptions.params,
    );
    if (mergedOptions.cache) {
      if (this.requestCacheMap.has(key)) {
        request = this.requestCacheMap.get(key) as Observable<T>;
      } else {
        request = request.pipe(
          shareReplay(1),
          catchError((error) => {
            if (mergedOptions.handleError) this.handleHttpError(error);
            return throwError(() => new Error(error));
          }),
          retry(),
        );
      }
      this.requestCacheMap.set(key, request);
    } else {
      request = request.pipe(
        catchError((error) => {
          if (mergedOptions.handleError) this.handleHttpError(error);
          return throwError(() => new Error(error));
        }),
        retry(),
      );
    }
    if (showLoader) {
      return this.loaderService.showLoaderUntilCompleted(request);
    }
    return request;
  }

  /**
   * Sends a POST request to the specified URL with the provided body and options.
   *
   * @param {string} url - The URL to send the request to.
   * @param {Record<string | number, unknown>} body - The body of the request.
   * @param {HttpOptions} [options] - The options for the request.
   * @return {Observable<T>} An observable that emits the response of the request.
   */
  post<T>(
    url: string,
    body: Record<string | number, unknown>,
    options?: HttpOptions,
  ): Observable<T> {
    const mergedOptions = this._mergeDefaultOptions(options);
    if (mergedOptions.endWithSlash) {
      url = url.endsWith('/') ? url : url + '/';
      if (mergedOptions.suffix) {
        mergedOptions.suffix = mergedOptions.suffix.endsWith('/')
          ? mergedOptions.suffix
          : mergedOptions.suffix + '/';
      }
    }
    const request = this.http.post<T>(url + mergedOptions.suffix, body).pipe(
      catchError((error) => {
        if (mergedOptions.handleError) this.handleHttpError(error);
        return throwError(() => new Error(error));
      }),
    );
    if (mergedOptions.showLoader) {
      return this.loaderService.showLoaderUntilCompleted(request);
    }
    return request;
  }

  /**
   * Sends a PUT request to the specified URL with the given body and options.
   *
   * @param {string} url - The URL to send the request to.
   * @param {Record<string | number, unknown>} body - The body of the request.
   * @param {HttpOptions} options - The options for the request (optional).
   * @return {Observable<T>} An observable that emits the response.
   */
  put<T = unknown>(
    url: string,
    body: Record<string | number, unknown>,
    options?: HttpOptions,
  ): Observable<T> {
    const mergedOptions = this._mergeDefaultOptions(options);
    if (mergedOptions.endWithSlash) {
      url = url.endsWith('/') ? url : url + '/';
      if (mergedOptions.suffix) {
        mergedOptions.suffix = mergedOptions.suffix.endsWith('/')
          ? mergedOptions.suffix
          : mergedOptions.suffix + '/';
      }
    }
    const request = this.http.put<T>(url + mergedOptions.suffix, body).pipe(
      catchError((error) => {
        if (mergedOptions.handleError) this.handleHttpError(error);
        return throwError(() => new Error(error));
      }),
    );
    if (mergedOptions.showLoader) {
      return this.loaderService.showLoaderUntilCompleted(request);
    }
    return request;
  }

  /**
   * Deletes a resource from the server using the specified URL.
   *
   * @param {string} url - The URL of the resource to delete.
   * @param {HttpOptions} [options] - The options for the HTTP request.
   * @return {Observable<T>} An observable that emits the response from the server.
   */
  delete<T = unknown>(url: string, options?: HttpOptions): Observable<T> {
    const mergedOptions = this._mergeDefaultOptions(options);
    if (mergedOptions.endWithSlash) {
      url = url.endsWith('/') ? url : url + '/';
      if (mergedOptions.suffix) {
        mergedOptions.suffix = mergedOptions.suffix.endsWith('/')
          ? mergedOptions.suffix
          : mergedOptions.suffix + '/';
      }
    }
    const request = this.http.delete<T>(url + mergedOptions.suffix).pipe(
      catchError((error) => {
        if (mergedOptions.handleError) this.handleHttpError(error);
        return throwError(() => new Error(error));
      }),
    );
    if (mergedOptions.showLoader) {
      return this.loaderService.showLoaderUntilCompleted(request);
    }
    return request;
  }

  /**
   * Handles HTTP errors by navigate to error page.
   *
   * @param {Object} error - The error object containing status and ok properties.
   * @return {void}
   */
  handleHttpError(error: { status: number; ok: boolean }): void {
    if (!error.ok) {
      if (error.status === 404) {
        this.router.navigate(['/errors/404']).then();
      } else if (error.status === 500) {
        this.router.navigate(['/errors/500']).then();
      }
    }
  }

  /**
   * Deletes the cache entry with the specified key.
   *
   * @param {string} key - The key of the cache entry to delete.
   * @return {void} This function does not return any value.
   */
  deleteCache(url: string, params: Record<string | number, unknown>): void {
    const key = this._generateKey(url, params);
    this.requestCacheMap.delete(key);
  }

  /**
   * Deletes all caches.
   *
   * @param {none} - This function does not take any parameters.
   * @return {none} - This function does not return any value.
   */
  deleteAllCaches() {
    this.requestCacheMap.clear();
  }

  private _mergeDefaultOptions(options?: HttpOptions): HttpOptions {
    const defaults: HttpOptions = {
      ...this.defaultOptions,
    };
    Object.assign(defaults, options);
    return defaults;
  }
  private _generateKey(
    url: string,
    params: Record<string | number, unknown>,
  ): string {
    return (
      url +
      Object.entries(params)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    );
  }
}
export const DEFAULT_HTTP_SERVICE_OPTIONS: HttpOptions = {
  params: {},
  showLoader: true,
  handleError: true,
  cache: true,
  suffix: '',
  endWithSlash: true,
};

export const HTTP_SERVICE_OPTIONS = new InjectionToken<HttpOptions>(
  'Http Service options',
  {
    providedIn: 'root',
    factory: () => DEFAULT_HTTP_SERVICE_OPTIONS,
  },
);
