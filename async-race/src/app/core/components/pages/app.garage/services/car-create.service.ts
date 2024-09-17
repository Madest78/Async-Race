import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Car, NewCar } from '../models/car.models';
import { CarApiService } from './car-api.service';
import { CarLoadService } from './car-load.service';

@Injectable({
  providedIn: 'root',
})
export class CarCreateService {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private carApiService: CarApiService, private carLoadService: CarLoadService) {}

  createCar(car: NewCar): Observable<Car> {
    return this.carApiService.createCar(car).pipe(
      tap((newCar: Car) => {
        const currentCars = this.carLoadService.carsSubject.value;
        this.carLoadService.carsSubject.next([...currentCars, newCar]);
      }),
    );
  }

  createMultipleCars(cars: NewCar[]): Observable<Car[]> {
    return this.carApiService.createMultipleCars(cars).pipe(
      tap((newCars: Car[]) => {
        const currentCars = this.carLoadService.carsSubject.value;
        this.carLoadService.carsSubject.next([...currentCars, ...newCars]);
      }),
    );
  }
}
