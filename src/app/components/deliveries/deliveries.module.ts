import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeliveriesComponent } from './deliveries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RepartidoresComponent } from './repartidores/repartidores.component';
import { PedidosAsignadosComponent } from './repartidores/pedidos-asignados/pedidos-asignados.component';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';
import { TableModule } from '@shared/table/table.module';
import { SelectionListDialogModule } from '@shared/selection-list-dialog/selection-list-dialog.module';
import { ListaDeliveriesComponent } from './lista-deliveries/lista-deliveries.component';
import { TabsModule } from '@shared/tabs/tabs.module';

const routes: Routes = [
  {
    path: '',
    component: DeliveriesComponent,
    children: [
      { path: '', redirectTo: 'lista-deliveries', pathMatch: 'full' },
      {
        path: 'lista-deliveries',
        component: ListaDeliveriesComponent,
        data: {
          breadcrumb: 'Lista de deliveries'
        }
      },
      {
        path: 'repartidores',
        data: {
          breadcrumb: 'Repartidores'
        },
        children: [
          {
            path: '',
            component: RepartidoresComponent,
          },
          {
            path: 'pedidos-asignados/:idRepartidor',
            component: PedidosAsignadosComponent,
            data: {
              breadcrumb: 'Pedidos Asignados'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    DeliveriesComponent,
    RepartidoresComponent,
    PedidosAsignadosComponent,
    ListaDeliveriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    SelectionListDialogModule,
    TabsModule,
  ]
})
export class DeliveriesModule { }
