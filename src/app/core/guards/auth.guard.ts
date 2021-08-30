import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Controla el acceso a rutas para los usuarios
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(next);
    if (this.authService.isLogged()) {
      console.log('paso el guard');
      // logged in so return true
      return true;
    } else {
      console.log('no pasó guard');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
