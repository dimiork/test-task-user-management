import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl || '';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = apiUrl + '/' + request.url;
    request = request.clone({ url });

    return next.handle(request);
  }
}
