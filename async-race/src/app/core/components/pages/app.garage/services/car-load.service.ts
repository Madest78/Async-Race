import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Car } from '../models/car.models';
import { CarApiService } from './car-api.service';

@Injectable({
  providedIn: 'root',
})
export class CarLoadService {
  carsSubject = new BehaviorSubject<Car[]>([]);

  cars$ = this.carsSubject.asObservable();

  constructor(private carApiService: CarApiService) {
    this.loadCars();
  }

  loadCars(): void {
    this.carApiService.getCars().subscribe((cars) => {
      this.carsSubject.next(cars);
    });
  }
}
