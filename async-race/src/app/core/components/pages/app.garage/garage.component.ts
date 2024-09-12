import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarService } from 'src/app/share/services/car-service';
import { Car, NewCar } from './models/car.models';
import { CarListComponent } from './components/car-list/car-list.component';
import { RandomCarService } from './services/random-car.service';

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

  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(private carService: CarService, private randomCarService: RandomCarService) {}

  onSubmit(): void {
    if (!this.newCar.name) {
      this.newCar.name = RandomCarService.generateRandomCarName();
    }
    if (!this.newCar.color) {
      this.newCar.color = RandomCarService.generateRandomColor();
    }
    this.carService.createCar(this.newCar).subscribe(() => {
      this.showCreateForm = false;
      this.newCar = { name: '', color: '' };
    });
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
    });
  }

  showUpdateFormForCar(car: Car): void {
    this.updatedCar = { ...car };
    this.showUpdateForm = true;
  }
}
