import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomCarService {
  static generateRandomCarName(): string {
    const carNames = ['Lamborgini', 'Pagani', 'Bugatti', 'Ferraei', 'Maserati', 'AlfaRomeo', 'ЗАЗ', 'Audi', 'Mazda', 'Opel', 'Ford'];
    const randomIndex = Math.floor(Math.random() * carNames.length);
    return carNames[randomIndex];
  }

  static generateRandomColor(): string {
    const letters = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
