import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolesUsuarioComponent } from './roles-usuario/roles-usuario.component';
import { PipesSharedModule } from '@pipes/pipes-shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { TabsModule } from '@shared/tabs/tabs.module';
import { TableModule } from '@shared/table/table.module';
import { SelectionListDialogModule } from '@shared/selection-list-dialog/selection-list-dialog.module';


const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      { path: '', redirectTo: 'lista-usuarios', pathMatch: 'full' },
      {
        path: 'lista-usuarios',
        data: {
          breadcrumb: 'Lista de usuarios'
        },
        children: [
          {
            path: '',
            component: ListaUsuariosComponent,
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
        ]
      }
    ]
  },
];

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioComponent,
    RolesUsuarioComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PipesSharedModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    TabsModule,
    TableModule,
    SelectionListDialogModule,
  ],
  providers: [ ]
})
export class UsuariosModule { }
