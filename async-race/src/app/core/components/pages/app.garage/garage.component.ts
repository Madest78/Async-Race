/* eslint-disable import/extensions */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Car, NewCar } from './models/car.model';
import { CarListComponent } from './components/car-list/car-list.component';
import { RandomCarService } from './services/random-car.service';
import { CarCreateService } from './services/car-create.service';
import { CarUpdateDeleteService } from './services/car-update-delete.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [RouterModule, CommonModule, CarListComponent, FormsModule],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {
  showCreateForm = false;

  showUpdateForm = false;

  newCar: NewCar = { name: '', color: '' };

  updatedCar: Car = { id: 0, name: '', color: '' };

  /* eslint-disable-next-line no-useless-constructor */
  constructor(
    private carCreateService: CarCreateService,
    private carUpdateDeleteService: CarUpdateDeleteService,
  // eslint-disable-next-line no-empty-function
  ) {}

  onSubmit(): void {
    if (!this.newCar.name) {
      this.newCar.name = RandomCarService.generateRandomCarName();
    }
    if (!this.newCar.color) {
      this.newCar.color = RandomCarService.generateRandomColor();
    }
    this.carCreateService.createCar(this.newCar).subscribe(() => {
      this.showCreateForm = false;
      this.newCar = { name: '', color: '' };
    });
  }

  generateCars(): void {
    const cars: NewCar[] = [];
    for (let i = 0; i < 100; i += 1) {
      const newCar: NewCar = {
        name: RandomCarService.generateRandomCarName(),
        color: RandomCarService.generateRandomColor(),
      };
      cars.push(newCar);
    }
    cars.forEach((car) => {
      this.carCreateService.createCar(car).subscribe(() => {
        console.log('Car created successfully');
      });
    });
  }
}
