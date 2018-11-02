import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Intercepted!", req);
    const copiedReq = req.clone({
      headers: req.headers.set(
        "authorization",
        "Bearer " + this.authService.getToken()
      )
    });
    console.log("copied req", copiedReq);
    return next.handle(copiedReq);
  }
}
