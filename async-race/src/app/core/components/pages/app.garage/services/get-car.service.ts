import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Car } from '../models/car.models';

@Injectable({
  providedIn: 'root',
})
export class GetCarService {
  private readonly endpoint = 'http://localhost:3000/garage';

  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(private http: HttpClient) {}

  getCars(page?: number, limit?: number): Observable<Car[]> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('_page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('_limit', limit.toString());
    }
    return this.http.get<Car[]>(this.endpoint, { params });
  }

  getTotalCount(): Observable<number> {
    return this.http
      .get(this.endpoint, { observe: 'response' })
      .pipe(
        map((response) => {
          const totalCount = response.headers.get('x-Total-Count');
          return totalCount ? parseInt(totalCount, 10) : 0;
        }),
      );
  }
}
