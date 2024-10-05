import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { CarApiService } from 'src/app/core/pages/app.garage/services/car-api.service';
import { Car } from 'src/app/core/pages/app.garage/models/car.model';
import { Winner } from '../../../models/winners.model';
import { WinnersApiService } from '../../../services/winners-api.service';

@Component({
  selector: 'app-winners-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './winners-list.component.html',
  styleUrl: './winners-list.component.scss',
})
export class WinnersListComponent implements OnInit {
  @Input() winnerId!: number;

  carDetailsMap: { [key: number]: Car} = {};

  winners: Winner[] = [];

  isLoading = true;

  currentPage = 1;

  itemsPerPage = 10;

  totalItems = 0;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private winnersApiService: WinnersApiService,
    private carApiService: CarApiService,
  // eslint-disable-next-line no-empty-function
  ) {}

  ngOnInit(): void {
    this.loadWinners(this.currentPage);
  }

  loadWinners(page: number, sort: string = 'id', order: 'ASC' | 'DESC' = 'ASC'): void {
    this.isLoading = true;
    this.winnersApiService.getWinners(page, this.itemsPerPage, sort, order).subscribe(
      (winners) => {
        this.winners = winners;

        this.winners.forEach((winner) => {
          this.carApiService.getCarById(winner.id).subscribe((carDetails) => {
            this.carDetailsMap[winner.id] = carDetails;
          });
        });
        this.isLoading = false;
      },
    );
  }

  sortWinners(sort: string, order: 'ASC' | 'DESC'): void {
    this.loadWinners(1, sort, order);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadWinners(this.currentPage);
  }
}
