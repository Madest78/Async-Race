import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { AbstractRequestService } from 'src/app/share/services/abstract-request.service';
import { Car } from '../models/car.models';

@Injectable({
  providedIn: 'root',
})
export class CarService extends AbstractRequestService {
  /* eslint-disable-next-line class-methods-use-this */
  getEndpoint(): string {
    return 'http://localhost:3000/garage';
  }

  getCars(page?: number, limit?: number): Observable<Car[]> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('_page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('_limit', limit.toString());
    }
    return this.get<Car[]>(params);
  }

  getTotalCount(): Observable<number> {
    return this.http
      .get<number>(this.getEndpoint(), { observe: 'response' })
      .pipe(
        map((response) => {
          const totalCount = response.headers.get('x-Total-Count');
          return totalCount ? parseInt(totalCount, 10) : 0;
        }),
      );
  }
}
