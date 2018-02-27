import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UserSession } from '../UserSession';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Create an AuthService to encapsulate the token-related manipulations
    const token = UserSession.accessToken;
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
