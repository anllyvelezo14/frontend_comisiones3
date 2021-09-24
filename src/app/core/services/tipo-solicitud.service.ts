import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoSolicitud } from '../models/tipo-solicitud';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipoSolicitudService {
  private urlEndPoint = 'http://localhost:3000/api/tipos-solicitud';

  constructor(private http: HttpClient) {}

  getTipoSolicitud(): Observable<TipoSolicitud[]> {
    return this.http.get<TipoSolicitud[]>(this.urlEndPoint);
  }
}
