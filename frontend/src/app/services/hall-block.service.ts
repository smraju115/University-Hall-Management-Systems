import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HallBlock } from '../models/Data/hall-block';
import { Observable } from 'rxjs';
import { Hall } from '../models/Data/hall';

@Injectable({
  providedIn: 'root'
})
export class HallBlockService {

  constructor(private http:HttpClient) { }
    getAll(): Observable<HallBlock[]>{
      return this.http.get<HallBlock[]>('http://localhost:5115/api/HallBlocks');
    }
    getById(id:number):Observable<HallBlock>{
      return this.http.get<HallBlock>(`http://localhost:5115/api/HallBlocks/${id}`);
    }

    create(data: HallBlock):Observable<HallBlock>{
      return this.http.post<HallBlock>(`http://localhost:5115/api/HallBlocks`, data);
    }

    update(data:HallBlock):Observable<any>{
      return this.http.put<any>(`http://localhost:5115/api/HallBlocks/${data.hallBlockId}`, data);
    }

    delete(id:number):Observable<any>{
      return this.http.delete<any>(`http://localhost:5115/api/HallBlocks/${id}`);
    }

}
