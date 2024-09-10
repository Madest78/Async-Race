import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.models';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  totalCount: number = 0;

  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadTotalCount();
  }

  loadCars(page: number = 1, limit: number = 10): void {
    this.carService.getCars(page, limit)
      .subscribe((cars) => {
        this.cars = cars;
      });
  }

  loadTotalCount(): void {
    this.carService.getTotalCount()
      .subscribe((count) => {
        this.totalCount = count;
      });
  }
}
