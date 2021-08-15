import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario, UsuarioResponse } from '../models/usuario';
import { JwtResponseI } from '../models/jwt-response';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  token: string;

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  // Verifica si user ha hecho login
  isLogged(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  // Verifica token
  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log(isExpired);

    isExpired ? this.logout() : this.authSubject.next(true);
    // if (isExpired) {
    //   this.logout();
    // } else {
    //   this.authSubject.next(true);
    // }
  }

  login(usuario: Usuario): Observable<UsuarioResponse | void> {
    return this.http
      .post<UsuarioResponse>(`${environment.API_URL}/api/signin`, usuario)
      .pipe(
        map((res: UsuarioResponse) => {
          console.log(res);
          if (res) {
            // guarda token y dice que el user esta autenticado
            this.saveToken(res.token);
            this.authSubject.next(true);
          }
          return res;
        })
      );
  }

  // guarda token en session storage
  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    // localStorage.setItem('EXPIRES_IN', expiresIn);
  }

  logout(): void {
    // this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    this.authSubject.next(false);
    // localStorage.removeItem('EXPIRES_IN');
  }
}
