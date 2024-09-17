import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Car } from '../models/car.model';
import { CarApiService } from './car-api.service';
import { CarLoadService } from './car-load.service';

@Injectable({
  providedIn: 'root',
})
export class CarUpdateDeleteService {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private carApiService: CarApiService, private carLoadService: CarLoadService) {}

  updateCar(updatedCar: Car): Observable<Car> {
    return this.carApiService.updateCar(updatedCar).pipe(
      tap((updated: Car) => {
        const updatedCars = this.carLoadService.carsSubject.value.map(
          (car) => (car.id === updated.id ? updated : car),
        );
        this.carLoadService.carsSubject.next(updatedCars);
      }),
    );
  }

  deleteCar(id: number): Observable<void> {
    return this.carApiService.deleteCar(id).pipe(
      tap(() => {
        const currentCars = this.carLoadService.carsSubject.value.filter((car) => car.id !== id);
        this.carLoadService.carsSubject.next(currentCars);
      }),
    );
  }
}
