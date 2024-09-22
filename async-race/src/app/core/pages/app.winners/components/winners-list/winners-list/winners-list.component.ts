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

  currentPage = 1;

  itemsPerPage = 10;

  totalItems = 0;

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private winnersApiService: WinnersApiService) {}

  ngOnInit(): void {
    this.loadWinners(this.currentPage);
  }

  loadWinners(page: number): void {
    this.winnersApiService.getWinners(page, this.itemsPerPage, 'wins', 'DESC').subscribe(
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

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadWinners(this.currentPage);
  }
}
