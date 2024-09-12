import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarService } from 'src/app/share/services/car-service';
import { Car } from '../../models/car.models';
import { RandomCarService } from '../../services/random-car.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  totalCount: number = 0;

  showUpdateForm = false;

  updatedCar: Car = { id: 0, name: '', color: '' };

  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.cars$.subscribe((cars) => {
      this.cars = cars;
      this.loadTotalCount();
    });
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.carService.loadCars();
    });
  }

  showUpdateFormForCar(car: Car): void {
    this.updatedCar = { ...car };
    this.showUpdateForm = true;
  }

  onUpdate(): void {
    if (!this.updatedCar.name) {
      this.updatedCar.name = RandomCarService.generateRandomCarName();
    }
    if (!this.updatedCar.color) {
      this.updatedCar.color = RandomCarService.generateRandomColor();
    }
    this.carService.updateCar(this.updatedCar).subscribe(() => {
      this.showUpdateForm = false;
      this.updatedCar = { id: 0, name: '', color: '' };
      this.carService.loadCars(); // Reload cars after update
    });
  }

  loadTotalCount(): void {
    this.totalCount = this.cars.length;
  }
}
