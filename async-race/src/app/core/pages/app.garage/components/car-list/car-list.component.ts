import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { Car, StartedCar } from '../../models/car.model';
import { RandomCarService } from '../../services/random-car.service';
import { StartStopCarService } from '../../services/start-stop-car.service';
import { CarUpdateDeleteService } from '../../services/car-update-delete.service';
import { CarLoadService } from '../../services/car-load.service';
import { WinnersApiService } from '../../../app.winners/services/winners-api.service';

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

  currentPage: number = 1;

  itemsPerPage: number = 7;

  showUpdateForm = false;

  updatedCar: Car = { id: 0, name: '', color: '' };

  /* eslint-disable-next-line no-useless-constructor */
  constructor(
    private carLoadService: CarLoadService,
    private carUpdateDeleteService: CarUpdateDeleteService,
    private startStopCarService: StartStopCarService,
    private renderer: Renderer2,
    private winnersApiService: WinnersApiService,
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

    this.carLoadService.totalCount$.subscribe((total) => {
      this.totalCount = total;
    });
  }

  deleteCar(id: number): void {
    this.carUpdateDeleteService.deleteCar(id).subscribe({
      next: () => {
        this.winnersApiService.deleteWinner(id).subscribe();
      },
    });
  }

  loadCars(): void {
    this.carLoadService.loadCars(this.currentPage, this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.totalCount) {
      this.currentPage += 1;
      this.loadCars();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadCars();
    }
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
          const { velocity, distance } = response;
          if (status === 'started') {
            if (velocity > 0) {
              const timeOfRace = (distance / 1000) / velocity;
              console.log(`Time of race: ${timeOfRace.toFixed(3)} seconds`);
            }
            this.startStopCarService.makeDrivingRequest(id).subscribe(
              (driveResponse) => {
                if (driveResponse.success) {
                  console.log('Drive request succeeded', driveResponse);
                }
              },
            );
          } else {
            this.stopAnimation(car);
          }
        },
      );
    }
  }

  private makeDrivingRequest(id: number, results: StartedCar[], timeOfRace: number): void {
    this.startStopCarService.makeDrivingRequest(id).subscribe(
      (response) => {
        if (response.success) {
          const car = this.cars.find((c) => c.id === id);
          if (car) {
            results.push(car);
            if (results.length === 1) {
              console.log(`Winner: id ${car.id}! Time ${timeOfRace.toFixed(3)}`);
              this.winnersApiService.getWinnerById(car.id).subscribe(
                (existingWinner) => {
                  const updatedWins = (existingWinner.wins ?? 0) + 1;
                  if (existingWinner.time < timeOfRace) {
                    this.winnersApiService.updateWinner(car.id, {
                      wins: updatedWins,
                      time: existingWinner.time,
                    }).subscribe(
                      (updatedWinner) => {
                        console.log('Wins updated', updatedWinner);
                      },
                    );
                    return;
                  }
                  this.winnersApiService.updateWinner(car.id, {
                    time: timeOfRace,
                    wins: updatedWins,
                  }).subscribe(
                    (updatedWinner) => {
                      console.log('Winner updated', updatedWinner);
                    },
                  );
                },
                (error) => {
                  if (error.status === 404) {
                    this.winnersApiService.createWinner(car.id, {
                      id: car.id,
                      time: timeOfRace,
                      wins: 1,
                    }).subscribe(
                      (newWinner) => {
                        console.log('Winner created', newWinner);
                      },
                    );
                  } else {
                    console.error(error);
                  }
                },
              );
            }
          }
        }
      },
      // (error) => {
      //   if (error.status === 500) {
      //     // console.error(`Error id ${id}.`);
      //     const car = this.cars.find((c) => c.id === id);
      //     if (car) {
      //       this.stopAnimation(car);
      //     }
      //   } else {
      //     console.error(`Ошибка на id ${id}`, error);
      //   }
      // },
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

  startAllCars(): void {
    const carIds = this.cars.map((car) => car.id);
    const results: StartedCar[] = [];
    const startPromises = carIds.map((id) => lastValueFrom(this.startStopCarService.patchStartStopCar(id, 'started')));

    Promise.all(startPromises)
      .then((responses) => {
        responses.forEach((response, index) => {
          const { velocity, distance } = response;
          if (velocity > 0) {
            const timeOfRace = (distance / 1000) / velocity;
            console.log(`Car ${carIds[index]} time of race: ${timeOfRace.toFixed(3)} seconds`);

            this.makeDrivingRequest(carIds[index], results, timeOfRace);
          }
        });
      })
      .catch((error) => {
        console.error('Start all cars error', error);
      });
  }
}
