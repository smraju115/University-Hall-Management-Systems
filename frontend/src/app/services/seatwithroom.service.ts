import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeatWithRoom } from '../models/Data/seatwithroom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatwithroomService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<SeatWithRoom[]> {
      return this.http.get<SeatWithRoom[]>('http://localhost:5115/api/SeatWithRooms');
    }

    getById(id: number): Observable<SeatWithRoom> {
      return this.http.get<SeatWithRoom>(`http://localhost:5115/api/SeatWithRooms/${id}`);
    }

    create(data: SeatWithRoom): Observable<SeatWithRoom> {
      return this.http.post<SeatWithRoom>('http://localhost:5115/api/SeatWithRooms', data);
    }

    update(data: SeatWithRoom): Observable<any> {
      return this.http.put<any>(`http://localhost:5115/api/SeatWithRooms/${data.seatWithRoomId}`, data);
    }

    delete(id: number): Observable<any> {
      return this.http.delete<any>(`http://localhost:5115/api/SeatWithRooms/${id}`);
    }
}
