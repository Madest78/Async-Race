export interface NewCar {
  name: string;
  color: string;
}

export interface Car extends NewCar {
  id: number;
}
