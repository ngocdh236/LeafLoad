import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Create an AuthService to encapsulate the token-related manipulations
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNywidXNlcm5hbWUiOiJuZ29jZCIsImVtYWlsIjoibmdvY2RAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInRpbWVfY3JlYXRlZCI6IjIwMTgtMDEtMjlUMTE6MjQ6MzIuMDAwWiIsImlhdCI6MTUxOTU5MTgyMiwiZXhwIjoxNTIxNjY1NDIyfQ.adYv3NmsGu5ThEWkzmTF5cVQHD_kFfCgLHp4h2R9N9s';//localStorage.getItem('token');
    if (token && token.trim() !== '') {
      request = request.clone({
        setHeaders: {
          'x-access-token': `${token}`
        }
      });
      return next.handle(request);
    }

    return next.handle(request);
  }
}
