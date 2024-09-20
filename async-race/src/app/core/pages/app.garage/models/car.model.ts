export interface NewCar {
  name: string;
  color: string;
}

export interface Car extends NewCar {
  id: number;
}

export interface StartedCar extends NewCar {
  id: number;
  isStarted: boolean;
  isDriving?: boolean;
  distance?: number;
  velocity?:number;
}

export interface DriveResponse {
  velocity: number;
  distance: number;
  success?: boolean;
  isDriving?: boolean;
}
