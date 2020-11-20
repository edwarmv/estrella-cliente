import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PedidosComponent } from './pedidos.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import {
  SeleccionarClienteComponent
} from './seleccionar-cliente/seleccionar-cliente.component';
import {
  AgregarProductoComponent
} from './agregar-producto/agregar-producto.component';

import {
  DayClickedDialogComponent
} from './day-clicked-dialog/day-clicked-dialog.component';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '',
    component: PedidosComponent
  },
  {
    path: 'lista-pedidos',
    component: ListaPedidosComponent
  },
  {
    path: 'nuevo-pedido',
    component: PedidoComponent,
    data: {
      breadcrumb: 'Nuevo pedido'
    }
  },
  {
    path: ':id',
    component: PedidoComponent,
    data: {
      breadcrumb: 'Editar pedido'
    }
  }
];

@NgModule({
  declarations: [
    PedidosComponent,
    DayClickedDialogComponent,
    PedidoComponent,
    SeleccionarClienteComponent,
    AgregarProductoComponent,
    ListaPedidosComponent
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatBadgeModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class PedidosModule { }
