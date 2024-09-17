import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Winner } from '../../../models/winners.model';
import { WinnersApiService } from '../../../services/winners-api.service';

@Component({
  selector: 'app-winners-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winners-list.component.html',
  styleUrl: './winners-list.component.scss',
})
export class WinnersListComponent implements OnInit {
  winners: Winner[] = [];

  isLoading = true;

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private winnersApiService: WinnersApiService) {}

  ngOnInit(): void {
    this.loadWinners();
  }

  loadWinners(): void {
    this.winnersApiService.getWinners(1, 10, 'wins', 'DESC').subscribe(
      (response) => {
        this.winners = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error', error);
        this.isLoading = false;
      },
    );
  }
}
