import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud } from '../models/solicitud';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private urlEndPoint = 'http://localhost:3000/api/comisiones';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // CRUD

  getSolicitudes(): Observable<any> {
    return this.http.get<Solicitud[]>(this.urlEndPoint).pipe(
      map((res) => {
        const solicitud = res as Solicitud[];
        return solicitud.map((newSolicitud) => {
          const lenEstados = newSolicitud.intermediate_comisiones.length;
          const final_estado =
            newSolicitud.intermediate_comisiones[lenEstados - 1][
              'intermediate_estados'
            ]['nombre'];
          newSolicitud.intermediate_comisiones = final_estado;
          return newSolicitud;
        });
      })
    );
  }

  getSolicitud(id: string): Observable<any> {
    return this.http.get<Solicitud>(`${this.urlEndPoint}/${id}`).pipe(
      map((res) => {
        const lenEstados = res.intermediate_comisiones.length;
        const final_estado = res.intermediate_comisiones[lenEstados - 1];
        res.intermediate_comisiones = final_estado;
        return res;
      })
    ); // Cast: json a tipo solicitud
  }

  createSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.post<Solicitud>(this.urlEndPoint, solicitud);
  }

  // Update
  updateSolicitud(id: string, data: Solicitud): Observable<any> {
    return this.http.patch<Solicitud>(`${this.urlEndPoint}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete<Solicitud>(`${this.urlEndPoint}/${id}`);
  }
}
