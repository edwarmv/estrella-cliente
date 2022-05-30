import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from '@services/autenticacion.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string;
        if (error.error.mensaje) {
          message = error.error.mensaje;
        }
        if (error.error.message) {
          message = error.error.message;
        }
        if (error.error.tokenExpired) {
          this.autenticacionService.cerrarSesion();
        }
        this.snackBar.open(`Error: ${message}`, 'Aceptar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        return throwError(error);
      })
    );
  }
}
