import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolesComponent } from './roles/roles.component';
import { PipesSharedModule } from '@pipes/pipes-shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { customPaginator } from '../paginator/custom.paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
    component: RolesComponent,
    data: {
      breadcrumb: 'Roles de usuario'
    }
  }
];

@NgModule({
  declarations: [UsuariosComponent, UsuarioComponent, RolesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PipesSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatListModule,
    MatAutocompleteModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Usuarios por página')
    }
  ]
})
export class UsuariosModule { }
