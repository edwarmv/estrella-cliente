import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RolComponent } from './rol/rol.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { TabsModule } from '@shared/tabs/tabs.module';
import { TableModule } from '@shared/table/table.module';
import { SelectionListDialogModule } from '@shared/selection-list-dialog/selection-list-dialog.module';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      { path: '', redirectTo: 'lista-roles', pathMatch: 'full' },
      {
        path: 'lista-roles',
        data: {
          breadcrumb: 'Lista de roles'
        },
        children: [
          { path: '', component: ListaRolesComponent },
          {
            path: 'nuevo-rol',
            component: RolComponent,
            data: {
              breadcrumb: 'Registrar rol'
            }
          },
          {
            path: ':id',
            component: RolComponent,
            data: {
              breadcrumb: 'Modificar rol'
            }
          }
        ]
      }
    ]
  },
];

@NgModule({
  declarations: [
    RolesComponent,
    RolComponent,
    ListaRolesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRippleModule,
    TabsModule,
    TableModule,
    SelectionListDialogModule,
  ],
  providers: [ ]
})
export class RolesModule { }
