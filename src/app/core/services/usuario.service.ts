import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Usuario, UsuarioResponse, UsuarioAuth } from '../models/usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlEndPoint = 'http://localhost:3000/api/usuarios';

  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // CRUD

  getUsuarios(): Observable<any> {
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  createUsuario(solicitud: Usuario): Observable<any> {
    return this.http.post<Usuario>(this.urlEndPoint, solicitud);
  }

  updateUsuario(id: string, data: Usuario): Observable<any> {
    return this.http.patch<Usuario>(`${this.urlEndPoint}/${id}`, data);
  }
}
