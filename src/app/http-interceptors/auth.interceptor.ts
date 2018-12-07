import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Intercepts all requests and adds the JWT auth token to the request header.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const copiedReq = req.clone({
      headers: req.headers.set(
        'authorization',
        'Bearer ' + this.authService.getToken()
      )
    });
    return next.handle(copiedReq);
  }
}
