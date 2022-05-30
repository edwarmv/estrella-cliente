import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeEsBO from '@angular/common/locales/es-BO';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from './layout/layout.module';
import {
  MessageDialogModule
} from '@shared/message-dialog/message-dialog.module';

import { LayoutModule as MatLayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { registerLocaleData } from '@angular/common';
import { httpInterceptorProviders } from './http-interceptors';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';

registerLocaleData(localeEsBO);

@NgModule({
  declarations: [
    AppComponent,
    RouterOutletComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LayoutModule,
    MessageDialogModule,
    MatLayoutModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-BO' },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
