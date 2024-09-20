import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WinnersListComponent } from './components/winners-list/winners-list/winners-list.component';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [RouterModule, WinnersListComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
})
export class WinnersComponent {}
