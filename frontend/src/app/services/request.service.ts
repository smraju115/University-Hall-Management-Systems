import { apiBaseUrl } from './../shared/app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomRequest } from '../models/Data/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<CustomRequest[]> {
    return this.http.get<CustomRequest[]>('http://localhost:5115/api/Requests');
  }

  getById(id: number): Observable<CustomRequest> {
    return this.http.get<CustomRequest>(`http://localhost:5115/api/Requests/${id}`);
  }

  create(data: CustomRequest): Observable<CustomRequest> {
    return this.http.post<CustomRequest>('http://localhost:5115/api/Requests', data);
  }

  update(data: CustomRequest): Observable<any> {
    return this.http.put<any>(`http://localhost:5115/api/Requests/${data.requestId}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:5115/api/Requests/${id}`);
  }

}
