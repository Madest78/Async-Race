import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Winner } from '../models/winners.model';

@Injectable({
  providedIn: 'root',
})
export class WinnersApiService {
  private endpoint = 'http://localhost:3000/winners';

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private http: HttpClient) {}

  getWinners(
    page: number = 1,
    limit: number = 10,
    sort: string = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Observable<Winner[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString())
      .set('_sort', sort)
      .set('_order', order);
    return this.http.get<Winner[]>(this.endpoint, { params });
  }

  getWinnerById(id: number): Observable<Winner> {
    return this.http.get<Winner>(`${this.endpoint}/${id}`);
  }

  createWinner(id: number, winner: Partial<Winner>): Observable<Winner> {
    return this.http.post<Winner>(this.endpoint, winner);
  }

  updateWinner(id: number, winner: Partial<Winner>): Observable<Winner> {
    return this.http.put<Winner>(`${this.endpoint}/${id}`, winner);
  }

  deleteWinner(id: number): Observable<Winner> {
    return this.http.delete<Winner>(`${this.endpoint}/${id}`);
  }
}
