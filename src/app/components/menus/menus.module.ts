import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MenusComponent } from './menus.component';
import { MenuComponent } from './menu/menu.component';
import {
  SeleccionarSubmenuComponent
} from './seleccionar-submenu/seleccionar-submenu.component';
import { customPaginator } from '@components/paginator/custom.paginator';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: MenusComponent
  },
  {
    path: 'nuevo-menu',
    component: MenuComponent,
    data: {
      breadcrumb: 'Nuevo menú'
    }
  },
  {
    path: ':id',
    component: MenuComponent,
    data: {
      breadcrumb: 'Modificar menú'
    }
  }
];

@NgModule({
  declarations: [MenusComponent, MenuComponent, SeleccionarSubmenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRippleModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Menús por página')
    }
  ]
})
export class MenusModule { }
