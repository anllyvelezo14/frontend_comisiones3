import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../modules/usuarios/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // login(usuario: Usuario): Observable<any> {
  //   const params = new URLSearchParams();
  //   params.set('email', usuario.email);
  //   params.set('contrasena', usuario.contrasena);
  //   console.log(params.toString());
  //   return this.http.post<any>(
  //     `http://localhost:3000/api/signin`,
  //     params.toString()
  //   );
  // }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(usuario: Usuario) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Authorization',
    });
    const params = new URLSearchParams();
    params.set('grant_type', usuario.email);
    params.set('email', usuario.email);
    params.set('contrasena', usuario.contrasena);

    return this.http.post<any>(
      `http://localhost:3000/api/signin`,
      params.toString(),
      {
        headers: httpHeaders,
      }
    );
  }
}
