import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Car, StartedCar } from '../../models/car.models';
// import { CarService } from '../../services/car.service';
import { RandomCarService } from '../../services/random-car.service';
import { StartStopCarService } from '../../services/start-stop-car.service';
import { CarUpdateDeleteService } from '../../services/car-update-delete.service';
import { CarLoadService } from '../../services/car-load.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: StartedCar[] = [];

  totalCount: number = 0;

  showUpdateForm = false;

  updatedCar: Car = { id: 0, name: '', color: '' };

  /* eslint-disable-next-line no-useless-constructor */
  constructor(
    private carLoadService: CarLoadService,
    private carUpdateDeleteService: CarUpdateDeleteService,
    // private carService: CarService,
    private startStopCarService: StartStopCarService,
    private renderer: Renderer2,
  // eslint-disable-next-line no-empty-function
  ) {}

  loadTotalCount(): void {
    this.totalCount = this.cars.length;
  }

  ngOnInit(): void {
    this.carLoadService.cars$.subscribe((cars) => {
      this.cars = cars.map((car) => ({ ...car, isStarted: false }));
      this.loadTotalCount();
    });
  }

  deleteCar(id: number): void {
    this.carUpdateDeleteService.deleteCar(id).subscribe(() => {
      this.carLoadService.loadCars();
    });
  }

  onUpdate(): void {
    if (!this.updatedCar.name) {
      this.updatedCar.name = RandomCarService.generateRandomCarName();
    }
    if (!this.updatedCar.color) {
      this.updatedCar.color = RandomCarService.generateRandomColor();
    }
    this.carUpdateDeleteService.updateCar(this.updatedCar).subscribe(() => {
      this.showUpdateForm = false;
      this.updatedCar = { id: 0, name: '', color: '' };
    });
  }

  showUpdateFormForCar(car: Car): void {
    this.updatedCar = { ...car };
    this.showUpdateForm = true;
  }

  startStopCar(id: number, status: 'started' | 'stopped'): void {
    const car = this.cars.find((c) => c.id === id);

    if (car) {
      if (status === 'started') {
        this.startAnimation(car);
      }

      this.startStopCarService.patchStartStopCar(id, status).subscribe(
        (response) => {
          if (status === 'started') {
            console.log(response);
            this.makeDrivingRequest(id);
          } else {
            this.stopAnimation(car);
          }
        },
        () => {
          this.stopAnimation(car);
        },
      );
    }
  }

  private makeDrivingRequest(id: number): void {
    this.startStopCarService.makeDrivingRequest(id).subscribe(
      (response) => {
        console.log(response);
        const car = this.cars.find((c) => c.id === id);
        if (car) {
          this.stopAnimation(car);
        }
      },
      (error) => {
        if (error.status === 500) {
          console.error(error);
          const car = this.cars.find((c) => c.id === id);
          if (car) {
            this.stopAnimation(car);
          }
        } else {
          console.error(error);
        }
      },
    );
  }

  private startAnimation(car: StartedCar): void {
    const carElement = document.getElementById(`car-${car.id}`);
    if (carElement) {
      this.renderer.addClass(carElement, 'car-moving');
    }
  }

  private stopAnimation(car: StartedCar): void {
    const carElement = document.getElementById(`car-${car.id}`);
    if (carElement) {
      this.renderer.removeClass(carElement, 'car-moving');
    }
  }
}
