import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarService } from 'src/app/core/share/services/car-service';
import { CarListComponent } from './components/car-list/car-list.component';
import { NewCar } from './models/car.models';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [RouterModule, CommonModule, CarListComponent, FormsModule],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {
  showCreateForm = false;

  newCar: NewCar = { name: '', color: '' };

  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(private carService: CarService) {}

  onSubmit(): void {
    if (this.newCar.name && this.newCar.color) {
      this.carService.createCar(this.newCar).subscribe(() => {
        this.showCreateForm = false;
        this.newCar = { name: '', color: '' };
      });
    }
  }
}
