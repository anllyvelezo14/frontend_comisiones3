import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, UsuarioResponse } from '../models/usuario';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  token: string;

  constructor(private http: HttpClient, private router: Router) {
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

    // Verifica si ha expirado el token
    isExpired ? this.logout() : this.authSubject.next(true);
  }

  // guarda token en session storage
  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  // LOGIN
  login(usuario: Usuario): Observable<UsuarioResponse | void> {
    return this.http
      .post<UsuarioResponse>(`${environment.API_URL}/api/signin`, usuario)
      .pipe(
        map((res: UsuarioResponse) => {
          if (res) {
            console.log(res);
            // guarda token y dice que el user esta autenticado
            this.saveToken(res.token);
            this.authSubject.next(true);
          }
          console.log('islogged', this.authSubject);
          return res;
        })
      );
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.authSubject.next(false);
    this.router.navigate(['/app-login']);
  }
}
