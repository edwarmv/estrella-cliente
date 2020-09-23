import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PedidosComponent } from './pedidos.component';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import {
  DayClickedDialogComponent
} from './day-clicked-dialog/day-clicked-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: PedidosComponent
  }
];

@NgModule({
  declarations: [
    PedidosComponent,
    DayClickedDialogComponent
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild(routes),
    MatButtonModule,
    MatRippleModule,
    MatBadgeModule,
    MatDialogModule,
  ]
})
export class PedidosModule { }
