import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hall } from '../models/Data/hall';
import { Room } from '../models/Data/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http:HttpClient) { }
  getAll(): Observable<Room[]>{
      return this.http.get<Room[]>('http://localhost:5115/api/Rooms');
    }
    getById(id:number):Observable<Room>{
      return this.http.get<Room>(`http://localhost:5115/api/Rooms/${id}`);
    }

    create(data:Room):Observable<Hall>{
      return this.http.post<Room>(`http://localhost:5115/api/Rooms`, data);
    }

    update(data:Room):Observable<any>{
      return this.http.put<any>(`http://localhost:5115/api/Rooms/${data.roomId}`, data);
    }

    delete(id:number):Observable<any>{
      return this.http.delete<any>(`http://localhost:5115/api/Rooms/${id}`);
    }
}
