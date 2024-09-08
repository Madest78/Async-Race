import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractRequestService {
  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(protected http: HttpClient) {}

  abstract getEndpoint(): string;

  get<T>(params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(this.getEndpoint(), { params, headers });
  }

  post<T, R>(body: R, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.getEndpoint(), body, { headers });
  }

  put<T, R>(body: R, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(this.getEndpoint(), body, { headers });
  }

  delete<T>(headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(this.getEndpoint(), { headers });
  }
}
