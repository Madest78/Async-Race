import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car, NewCar } from '../models/car.models';

@Injectable({
  providedIn: 'root',
})
export class CarApiService {
  private endpoint = 'http://localhost:3000/garage';

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.endpoint);
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
