import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PedidosComponent } from './pedidos.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ReportesPedidosComponent } from './reportes-pedidos/reportes-pedidos.component';
import {
  EventClickedDialogComponent
} from './calendario-pedidos/event-clicked-dialog/event-clicked-dialog.component';
import { PagosDialogComponent } from './pedido/pagos-dialog/pagos-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GoogleMapsModule } from '@angular/google-maps';
import { SelectionListDialogModule } from '@shared/selection-list-dialog/selection-list-dialog.module';
import { CalendarioPedidosComponent } from './calendario-pedidos/calendario-pedidos.component';
import { TabsModule } from '@shared/tabs/tabs.module';
import { BuscadorModule } from '@shared/buscador/buscador.module';
import { TableModule } from '@shared/table/table.module';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { PagosDialogService } from './pedido/pagos-dialog/pagos-dialog.service';

const routes: Routes = [
  {
    path: '',
    component: PedidosComponent,
    children: [
      {
        path: 'calendario-pedidos',
        data: {
          breadcrumb: 'Calendario de pedidos'
        },
        children: [
          { path: '', component: CalendarioPedidosComponent },
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
          },
        ]
      },
      {
        path: 'lista-pedidos',
        data: {
          breadcrumb: 'Lista de pedidos'
        },
        children: [
          {
            path: '',
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
          },
        ]
      },
      {
        path: 'reportes',
        component: ReportesPedidosComponent,
        data: {
          breadcrumb: 'Reportes'
        }
      },
      { path: '', redirectTo: 'calendario-pedidos', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    PedidosComponent,
    EventClickedDialogComponent,
    PedidoComponent,
    ListaPedidosComponent,
    ReportesPedidosComponent,
    CalendarioPedidosComponent,
    PagosDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatRadioModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonToggleModule,
    GoogleMapsModule,
    SelectionListDialogModule,
    TabsModule,
    TableModule,
    BuscadorModule,
    CalendarModule,
  ],
  providers: [
    PagosDialogService,
  ]
})
export class PedidosModule { }
