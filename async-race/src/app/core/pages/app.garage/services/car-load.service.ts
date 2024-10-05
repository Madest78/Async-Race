import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Car } from '../models/car.model';
import { CarApiService } from './car-api.service';

@Injectable({
  providedIn: 'root',
})
export class CarLoadService {
  carsSubject = new BehaviorSubject<Car[]>([]);

  cars$ = this.carsSubject.asObservable();

  totalCountSubject = new BehaviorSubject<number>(0);

  totalCount$ = this.totalCountSubject.asObservable();

  constructor(private carApiService: CarApiService) {
    this.loadCars();
  }

  loadCars(page: number = 1, limit: number = 7): void {
    this.carApiService.getCars(page, limit).subscribe((result) => {
      this.carsSubject.next(result.cars);
      this.totalCountSubject.next(result.total);
    });
  }
}
