import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriveResponse } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class StartStopCarService {
  private endpoint = 'http://localhost:3000/engine';

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private http: HttpClient) {}

  patchStartStopCar(id: number, status: 'started' | 'stopped' | 'drive'): Observable<DriveResponse> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('status', status);

    return this.http.patch<DriveResponse>(this.endpoint, null, { params });
  }

  makeDrivingRequest(id: number) {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('status', 'drive');

    return this.http.patch<{ distance: number; velocity: number }>(this.endpoint, null, { params });
  }
}
