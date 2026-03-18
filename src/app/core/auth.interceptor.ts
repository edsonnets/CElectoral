import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clonamos la petición para añadir 'withCredentials'
    const authReq = req.clone({
      withCredentials: true
    });
    return next.handle(authReq);
  }
}
