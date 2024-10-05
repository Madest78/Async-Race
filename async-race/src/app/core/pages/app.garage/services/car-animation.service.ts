import { Injectable, Renderer2 } from '@angular/core';
import { StartedCar } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarAnimationService {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  // eslint-disable-next-line class-methods-use-this
  startAnimation(car: StartedCar, timeOfRace: number, renderer: Renderer2): void {
    const carElement = document.getElementById(`car-${car.id}`);
    if (carElement) {
      renderer.setStyle(carElement, 'animation-duration', `${timeOfRace}s`);
      renderer.addClass(carElement, 'car-moving');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stopAnimation(car: StartedCar, renderer: Renderer2): void {
    const carElement = document.getElementById(`car-${car.id}`);
    if (carElement) {
      renderer.removeClass(carElement, 'car-moving');
    }
  }
}
