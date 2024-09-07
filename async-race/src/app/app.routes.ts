import { Routes } from '@angular/router';
import { GarageComponent } from './core/components/pages/app.garage/garage.component';
import { WinnersComponent } from './core/components/pages/app.winners/winners.component';

export const routes: Routes = [
  { path: 'app-garage', component: GarageComponent },
  { path: 'app-winners', component: WinnersComponent },
  { path: '**', component: GarageComponent },
];
