import { Injectable } from '@angular/core';
import { AdminNotice } from '../models/Data/admin-notice';
import { UploadNoticeResponse } from '../models/Data/upload-notice-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminNoticeService {

   constructor(private http:HttpClient) { }

        getAll(): Observable<AdminNotice[]>{
          return this.http.get<AdminNotice[]>('http://localhost:5115/api/Notices');
        }
        getById(id:number):Observable<AdminNotice>{
          return this.http.get<AdminNotice>(`http://localhost:5115/api/Notices/${id}`);
        }

        create(data:AdminNotice):Observable<AdminNotice>{
          return this.http.post<AdminNotice>(`http://localhost:5115/api/Notices`, data);
        }

        update(data:AdminNotice):Observable<any>{
          return this.http.put<any>(`http://localhost:5115/api/Notices/${data.noticeId}`, data);
        }

        delete(id:number):Observable<any>{
          return this.http.delete<any>(`http://localhost:5115/api/Notices/${id}`);
        }

        uploadNoticeFiles(f: File):Observable<UploadNoticeResponse>{
            const formData = new FormData();

            formData.append('notices', f);
            return this.http.post<UploadNoticeResponse>(`http://localhost:5115/api/Notices/UploadNotice`, formData);
          }
}
