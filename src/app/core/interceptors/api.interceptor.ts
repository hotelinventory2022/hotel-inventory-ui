import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Content-Type')) {
      request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      });
    }
    return next.handle(request);
  }
}
