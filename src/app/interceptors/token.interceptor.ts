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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywidXNlcm5hbWUiOiJ0aGluaHZvIiwiZW1haWwiOiJ0aGluaHZAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInRpbWVfY3JlYXRlZCI6IjIwMTgtMDEtMjlUMTA6NTY6MDEuMDAwWiIsImlhdCI6MTUxOTA0NjEwMiwiZXhwIjoxNTIxMTE5NzAyfQ.K2_RI2NM4g0Pdjn44v-CvSol0VdMkZa-n8XZ4L2JCak';//localStorage.getItem('token');
    console.log(`This is access token: ${token}`);
    if (token && token !== '') {
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
