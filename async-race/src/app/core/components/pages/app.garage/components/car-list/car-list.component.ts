import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from 'src/app/core/share/services/car-service';
import { Car } from '../../models/car.models';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  totalCount: number = 0;

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

  loadTotalCount(): void {
    this.totalCount = this.cars.length;
  }
}
