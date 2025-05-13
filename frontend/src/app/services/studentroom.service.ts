import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentRoom } from '../models/Data/studentroom';

@Injectable({
  providedIn: 'root'
})
export class StudentroomService {

   constructor(private http:HttpClient) { }

      getAll(): Observable<StudentRoom[]> {
        return this.http.get<StudentRoom[]>('http://localhost:5115/api/StudentRooms');
      }

      getById(id: number): Observable<StudentRoom> {
        return this.http.get<StudentRoom>(`http://localhost:5115/api/StudentRooms/${id}`);
      }

      create(data: StudentRoom): Observable<StudentRoom> {
        return this.http.post<StudentRoom>('http://localhost:5115/api/StudentRooms', data);
      }

      update(data: StudentRoom): Observable<any> {
        return this.http.put<any>(`http://localhost:5115/api/StudentRooms/${data.studentRoomId}`, data);
      }

      delete(id: number): Observable<any> {
        return this.http.delete<any>(`http://localhost:5115/api/StudentRooms/${id}`);
      }
}
