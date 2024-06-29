import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Farm } from '../models/farm.model';



@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router) {
  }
  getFarms(): Observable<Farm[]> {
    return this._httpClient.get<Farm[]>(`${env.url_api}/${env.api_version}/farm`);
  }

  getFarm(id: number): Observable<Farm> {
    return this._httpClient.get<Farm>(`${env.url_api}/${env.api_version}/farm/${id}`);
  }

  createFarm(farm: Farm): Observable<Farm> {
    return this._httpClient.post<Farm>(`${env.url_api}/${env.api_version}/farm`, farm);
  }

  updateFarm(id: number, farm: Farm): Observable<Farm> {
    return this._httpClient.put<Farm>(`${env.url_api}/${env.api_version}/farm?id=${id}`, farm);
  }

  deleteFarm(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${env.url_api}/${env.api_version}/farm/${id}`);
  }
  
}
