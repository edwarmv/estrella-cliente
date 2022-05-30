import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { TokenInterceptor } from './token.interceptor';

type HttpInterceptorProvider = {
  provide: InjectionToken<HttpInterceptor[]>,
  useClass: any,
  multi: boolean,
}

export const httpInterceptorProviders: HttpInterceptorProvider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
