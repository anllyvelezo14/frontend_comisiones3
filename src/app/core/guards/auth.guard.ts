import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  // Controla el acceso a rutas para los usuarios
  canActivate(): boolean {
    if (this.authService.isLogged) {
      // logged in so return true
      return true;
    }
  }
}
