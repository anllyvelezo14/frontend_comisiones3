import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this.authenticationService.tokenStorage;
    if (token != null) {
      const req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`interceptor ----- ${token}`);
      return next.handle(req);
    }

    return next.handle(request);
  }
}
