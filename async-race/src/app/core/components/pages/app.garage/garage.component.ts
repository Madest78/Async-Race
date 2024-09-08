import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Car } from './models/car.models';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit {
  cars: Car[] = [];

  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }
}
