import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Group } from '../models/group.model';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<{ data: Group[] }>(`${env.url_api}/${env.api_version}/Group`).pipe(
      map(response => response.data)
    );
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(`${env.url_api}/${env.api_version}/group/${id}`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${env.url_api}/${env.api_version}/group`, group);
  }

  updateGroup(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${env.url_api}/${env.api_version}/group/${id}`, group);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${env.url_api}/${env.api_version}/group/${id}`);
  }
}
