import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MenusComponent } from './menus.component';
import { MenuComponent } from './menu/menu.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { ListaMenusComponent } from './lista-menus/lista-menus.component';
import { TabsModule } from '@shared/tabs/tabs.module';
import { TableModule } from '@shared/table/table.module';

const routes: Routes = [
  {
    path: '',
    component: MenusComponent,
    children: [
      { path: '', redirectTo: 'lista-menus', pathMatch: 'full' },
      {
        path: 'lista-menus',
        data: {
          breadcrumb: 'Lista de menús'
        },
        children: [
          { path: '', component: ListaMenusComponent },
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
        ],
      },
    ]
  },
];

@NgModule({
  declarations: [ MenusComponent, MenuComponent, ListaMenusComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRippleModule,
    TabsModule,
    TableModule,
  ],
  providers: [ ]
})
export class MenusModule { }
