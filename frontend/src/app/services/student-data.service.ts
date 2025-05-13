import { Student } from './../models/Data/student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadResponse } from '../models/Data/upload-response';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http: HttpClient) { }
  getAll():Observable<Student[]>{
    return this.http.get<Student[]>('http://localhost:5115/api/Students');
  }
  getById(id:number):Observable<Student>{
    return this.http.get<Student>(`http://localhost:5115/api/Students/${id}`);
  }
  create(data:Student):Observable<Student>{
    return this.http.post<Student>('http://localhost:5115/api/Students', data);
  }
  update(data:Student):Observable<any>{
    return this.http.put<any>(`http://localhost:5115/api/Students/${data.studentId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:5115/api/Students/${id}`);
  }
  uploadPicture(f: File):Observable<UploadResponse>{
    const formData = new FormData();

    formData.append('pic', f);
    return this.http.post<UploadResponse>(`http://localhost:5115/api/Students/UploadPicture`, formData);
  }
}
