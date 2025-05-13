import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HallFloor } from '../models/Data/hall-floor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallFloorService {

  constructor(private http:HttpClient) { }
   getAll(): Observable<HallFloor[]>{
        return this.http.get<HallFloor[]>('http://localhost:5115/api/HallFloors');
      }
      getById(id:number):Observable<HallFloor>{
        return this.http.get<HallFloor>(`http://localhost:5115/api/HallFloors/${id}`);
      }

      create(data:HallFloor):Observable<HallFloor>{
        return this.http.post<HallFloor>(`http://localhost:5115/api/HallFloors`, data);
      }

      update(data:HallFloor):Observable<any>{
        return this.http.put<any>(`http://localhost:5115/api/HallFloors/${data.hallFloorId}`, data);
      }

      delete(id:number):Observable<any>{
        return this.http.delete<any>(`http://localhost:5115/api/HallFloors/${id}`);
      }
}
