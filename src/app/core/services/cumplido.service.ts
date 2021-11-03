import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cumplido } from '../models/cumplido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CumplidoService {
  private urlEndPoint = 'http://localhost:3000/api/cumplidos';

  constructor(private http: HttpClient) {}

  createCumplido(cumplido: Cumplido): Observable<any> {
    return this.http.post<Cumplido>(this.urlEndPoint, cumplido);
  }
}
