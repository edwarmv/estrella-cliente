import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { customPaginator } from '@components/paginator/custom.paginator';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  },
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
];

@NgModule({
  declarations: [ClientesComponent, ClienteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Clientes por página')
    }
  ]
})
export class ClientesModule { }
