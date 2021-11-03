import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoSolicitud } from '../models/estadoSolicitud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoSolicitudIntermediaService {
  private urlEndPoint = 'http://localhost:3000/api/comisiones-estados';

  constructor(private http: HttpClient) {}

  getEstadosSolicitudes(): Observable<EstadoSolicitud[]> {
    return this.http.get<EstadoSolicitud[]>(this.urlEndPoint);
  }

  createEstadosSolicitudes(estadoSolicitud: EstadoSolicitud): Observable<any> {
    return this.http.post<EstadoSolicitud>(this.urlEndPoint, estadoSolicitud);
  }
}
