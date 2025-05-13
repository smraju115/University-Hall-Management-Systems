import { apiBaseUrl } from './../shared/app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http:HttpClient) { }

  getTotalStudents(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/Students/total-students`);

  }
  getTotalHalls(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/Halls/total-halls`);

  }

  getTotalHallBlocks(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/HallBlocks/total-hallblocks`);

  }

  getTotalHallFloors(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/HallFloors/total-hallfloors`);

  }
  getTotalRooms(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/Rooms/total-rooms`);

  }
  getTotalRequests(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/Requests/total-requests`);

  }
  getTotalFeedbacks(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/Feedbacks/total-feedbacks`);

  }
  getTotalNotices(): Observable<any> {
    return this.http.get(`${apiBaseUrl}/api/Notices/total-notices`);

  }
}
