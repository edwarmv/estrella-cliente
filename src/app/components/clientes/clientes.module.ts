import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { TabsModule } from '@shared/tabs/tabs.module';
import { TableModule } from '@shared/table/table.module';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      { path: '', redirectTo: 'lista-clientes', pathMatch: 'full' },
      {
        path: 'lista-clientes',
        data: {
          breadcrumb: 'Lista de clientes'
        },
        children: [
          { path: '', component: ListaClientesComponent },
          {
            path: 'nuevo-cliente',
            component: ClienteComponent,
            data: {
              breadcrumb: 'Nuevo cliente'
            }
          },
          {
            path: ':id',
            component: ClienteComponent,
            data: {
              breadcrumb: 'Modificar menú'
            }
          }
        ]
      },
    ]
  },
];

@NgModule({
  declarations: [
    ClientesComponent,
    ClienteComponent,
    ListaClientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    TabsModule,
    TableModule,
  ],
  providers: [ ]
})
export class ClientesModule { }
