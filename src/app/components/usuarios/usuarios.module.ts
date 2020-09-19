import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { UsuariosPaginator } from './usuarios.paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PipesSharedModule } from '@pipes/pipes-shared.module';


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
  }
];

@NgModule({
  declarations: [UsuariosComponent, UsuarioComponent],
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
    MatSelectModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: UsuariosPaginator()
    }
  ]
})
export class UsuariosModule { }
