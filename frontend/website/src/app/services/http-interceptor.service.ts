import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('Client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('Server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            this.authService.error = error.error
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
