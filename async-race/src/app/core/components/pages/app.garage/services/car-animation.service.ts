import { Injectable, Renderer2 } from '@angular/core';
import { StartedCar } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarAnimationService {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private renderer: Renderer2) {}

  startAnimation(car: StartedCar): void {
    const carElement = document.getElementById(`car-${car.id}`);
    if (carElement) {
      this.renderer.addClass(carElement, 'car-moving');
    }
  }

  stopAnimation(car: StartedCar): void {
    const carElement = document.getElementById(`car-${car.id}`);
    if (carElement) {
      this.renderer.removeClass(carElement, 'car-moving');
    }
  }
}
