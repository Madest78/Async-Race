import { Routes } from '@angular/router';
import { GarageComponent } from './core/pages/app.garage/garage.component';
import { WinnersComponent } from './core/pages/app.winners/winners.component';

export const routes: Routes = [
  { path: 'app-garage', component: GarageComponent },
  { path: 'app-winners', component: WinnersComponent },
  { path: '**', component: GarageComponent },
];
