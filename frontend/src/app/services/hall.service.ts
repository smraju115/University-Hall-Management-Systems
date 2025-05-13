import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hall } from '../models/Data/hall';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<Hall[]>{
    return this.http.get<Hall[]>('http://localhost:5115/api/Halls');
  }
  getById(id:number):Observable<Hall>{
    return this.http.get<Hall>(`http://localhost:5115/api/Halls/${id}`);
  }

  create(data:Hall):Observable<Hall>{
    return this.http.post<Hall>(`http://localhost:5115/api/Halls`, data);
  }

  update(data:Hall):Observable<any>{
    return this.http.put<any>(`http://localhost:5115/api/Halls/${data.hallId}`, data);
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:5115/api/Halls/${id}`);
  }


}
