import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car, NewCar } from '../../core/components/pages/app.garage/models/car.models';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carsSubject = new BehaviorSubject<Car[]>([]);

  cars$ = this.carsSubject.asObservable();

  private endpoint = 'http://localhost:3000/garage';

  constructor(private http: HttpClient) {
    this.loadCars();
  }

  loadCars(): void {
    this.http.get<Car[]>(this.endpoint).subscribe((cars) => {
      this.carsSubject.next(cars);
    });
  }

  createCar(car: NewCar): Observable<Car> {
    return this.http.post<Car>(this.endpoint, car).pipe(
      tap((newCar: Car) => {
        const currentCars = this.carsSubject.value;
        this.carsSubject.next([...currentCars, newCar]);
      }),
    );
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      tap(() => {
        const currentCars = this.carsSubject.value.filter((car) => car.id !== id);
        this.carsSubject.next(currentCars);
      }),
    );
  }

  updateCar(updatedCar: Car): Observable<Car> {
    return this.http.put<Car>(`${this.endpoint}/${updatedCar.id}`, updatedCar).pipe(
      tap((updated: Car) => {
        const updatedCars = this.carsSubject.value.map((car) => {
          if (car.id === updated.id) {
            return updated;
          }
          return car;
        });
        this.carsSubject.next(updatedCars);
      }),
    );
  }
}
