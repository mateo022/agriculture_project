import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Lot } from '../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http: HttpClient) { }

  getAllLots(): Observable<Lot[]> {
    return this.http.get<{ data: Lot[] }>(`${env.url_api}/${env.api_version}/lot`).pipe(
      map(response => response.data)
    );
  }

  getLotById(id: number): Observable<Lot> {
    return this.http.get<Lot>(`${env.url_api}/${env.api_version}/lot/${id}`);
  }

  createLot(lot: Lot): Observable<Lot> {
    return this.http.post<Lot>(`${env.url_api}/${env.api_version}/lot`, lot);
  }

  updateLot(id: number, lot: Lot): Observable<Lot> {
    return this.http.put<Lot>(`${env.url_api}/${env.api_version}/lot/${id}`, lot);
  }

  deleteLot(id: number): Observable<any> {
    return this.http.delete(`${env.url_api}/${env.api_version}/lot/${id}`);
  }
}
