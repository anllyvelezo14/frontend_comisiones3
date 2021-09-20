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
  authSubject = new BehaviorSubject<boolean>(false);
  token: string;
  usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  // Verifica si user ha hecho  login
  isLogged(): boolean {
    this.token = this.tokenStorage;
    if (this.token != null) {
      console.log(`ya hizo login`);
      return true;
    } else {
      // console.log(`no hizo login`);
      return false;
    }
  }

  // Verifica token
  private checkToken(): void {
    const user = localStorage.getItem('ACCESS_USER_ROLE') || null;
    const userToken = localStorage.getItem('ACCESS_TOKEN') || null;

    if (userToken) {
      const isExpired = helper.isTokenExpired(userToken, 3600);
      // console.log('isExpired', isExpired);
      // Verifica si ha expirado el token
      if (isExpired) {
        this.logout();
      } else {
        this.authSubject.next(true);
        // FALTA AGREGAR ROLES
      }
    }
  }

  // guarda token en session storage
  private saveLocalStorage(user: UsuarioResponse): void {
    const { token, usuario } = user;
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('ACCESS_USER_ROLE', usuario.roles_id.toString());
  }

  public get tokenStorage(): string {
    const userToken = localStorage.getItem('ACCESS_TOKEN');
    // console.log(userToken);
    return userToken;
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
            this.saveLocalStorage(res);
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
    localStorage.removeItem('ACCESS_USER_ROLE');
    this.authSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.API_URL}/olvido-contrasena`, {
      email,
    });
  }
}
