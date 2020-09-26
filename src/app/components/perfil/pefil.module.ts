import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UploadModule } from '@components/upload/upload.module';

import { PerfilComponent } from './perfil.component';
import { DescripcionRolComponent } from './descripcion-rol/descripcion-rol.component';
import { PipesSharedModule } from '@pipes/pipes-shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent
  }
];

@NgModule({
  declarations: [ PerfilComponent, DescripcionRolComponent ],
  imports: [
    CommonModule,
    PipesSharedModule,
    RouterModule.forChild(routes),
    UploadModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class PefilModule { }
