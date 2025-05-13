import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiBaseUrl } from '../../shared/app-constants';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const registerUrl = `${apiBaseUrl}/api/Account/Register`; 
    return this.http.post(registerUrl, user);
  }
}
