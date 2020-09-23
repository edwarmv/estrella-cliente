import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
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
    FormsModule,
    PipesSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Usuarios por página')
    }
  ]
})
export class UsuariosModule { }
