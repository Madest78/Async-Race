import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Car, NewCar } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarApiService {
  private endpoint = 'http://localhost:3000/garage';

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private http: HttpClient) {}

  getCars(page: number = 1, limit: number = 10): Observable<{ cars: Car[], total: number }> {
    const params = new HttpParams().set('_page', page).set('_limit', limit);

    return this.http.get<Car[]>(this.endpoint, { observe: 'response', params }).pipe(
      map((response) => {
        const totalRecords = +response.headers.get('X-Total-Count')!;
        return { cars: response.body || [], total: totalRecords };
      }),
    );
  }

  createCar(car: NewCar): Observable<Car> {
    return this.http.post<Car>(this.endpoint, car);
  }

  createMultipleCars(cars: NewCar[]): Observable<Car[]> {
    return this.http.post<Car[]>(this.endpoint, cars);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  updateCar(updatedCar: Car): Observable<Car> {
    return this.http.put<Car>(`${this.endpoint}/${updatedCar.id}`, updatedCar);
  }
}
