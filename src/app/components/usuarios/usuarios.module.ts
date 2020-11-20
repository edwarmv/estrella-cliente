import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolesUsuarioComponent } from './roles-usuario/roles-usuario.component';
import { AsignarRolComponent } from './roles-usuario/asignar-rol/asignar-rol.component';
import { PipesSharedModule } from '@pipes/pipes-shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { customPaginator } from '../paginator/custom.paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
  {
    path: ':id',
    component: UsuarioComponent,
    data: {
      breadcrumb: 'Más información'
    }
  },
  {
    path: ':id/roles',
    component: RolesUsuarioComponent,
    data: {
      breadcrumb: 'Roles de usuario'
    }
  }
];

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioComponent,
    RolesUsuarioComponent,
    AsignarRolComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PipesSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Usuarios por página')
    }
  ]
})
export class UsuariosModule { }
