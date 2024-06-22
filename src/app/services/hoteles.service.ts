import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelesService {
  // BBDD local
  private hotelsUrl = 'assets/db.json';

  constructor(private http: HttpClient) {}
/**
 * Acceso a la BBDD local
 * @returns
 */
  getHotels(): Observable<Hotel[]> {
    return this.http
      .get<{ hotels: Hotel[] }>(this.hotelsUrl)
      .pipe(map((response) => response.hotels));
  }
}
