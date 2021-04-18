import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('jwttokenworking')
    const token: any = localStorage.getItem('accesstoken');
    const tokenvalue =JSON.parse(token)
    if (tokenvalue) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${tokenvalue}`
        })
      });
    }
    return next.handle(request);
  }
}
