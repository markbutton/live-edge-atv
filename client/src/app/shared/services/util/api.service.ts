import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from './api-constants';

@Injectable()
export class APIService {

  constructor(private httpClient: HttpClient) { }

  protected apiGet<T>(path: string, params: HttpParams = null): Observable<T> {
    return this.apiRun('get', path, null, params);
  }

  protected apiPost<T>(path: string, body: any = null, params: HttpParams = null): Observable<T> {
    return this.apiRun('post', path, body, params);
  }

  protected apiPut<T>(path: string, body: any = null, params: HttpParams = null): Observable<T> {
    return this.apiRun('put', path, body, params);
  }

  protected apiDelete<T>(path: string, params: HttpParams = null): Observable<T> {
    return this.apiRun('delete', path, null, params);
  }

  protected apiRun<T>(method: string, path: string, body: any = null, params: HttpParams = null): Observable<T> {
    // set url
    const url = this.appendUrl(path);

    // set header
    let headers = new HttpHeaders();
    headers = this.appendHeader(headers);

    switch (method) {
      case 'post':
        return this.httpClient.post<T>(url, body, {
          params,
          headers
        });
      case 'put':
        return this.httpClient.put<T>(url, body, {
          params,
          headers
        });
      case 'delete':
        return this.httpClient.delete<T>(url, {
          params,
          headers
        });
      default:
        return this.httpClient.get<T>(url, {
          headers,
          params
        });
    }
  }

  private appendUrl(path: string): string {
    if (path.startsWith('/')) {
      return `${ApiConstants.URL}${path}`;
    }
    return `${ApiConstants.URL}${path}`;
  }

  private appendHeader(headers: HttpHeaders): any {
    return headers.set(ApiConstants.HEADER_KEY, ApiConstants.HEADER_VALUE);
  }
}
