import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductosComponent } from './productos.component';
import { ProductoComponent } from './producto/producto.component';
import { PipesSharedModule } from '@pipes/pipes-shared.module';
import { UploadModule } from '@components/upload/upload.module';
import { customPaginator } from '@components/paginator/custom.paginator';
import {
  DetallesProductoDialogComponent
} from './detalles-producto-dialog/detalles-producto-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  {
    path: 'nuevo-producto',
    component: ProductoComponent,
    data: {
      breadcrumb: 'Nuevo producto'
    }
  },
  {
    path: ':id',
    component: ProductoComponent,
    data: {
      breadcrumb: 'Editar información del producto'
    }
  }
];

@NgModule({
  declarations: [
    ProductosComponent,
    ProductoComponent,
    DetallesProductoDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UploadModule,
    ReactiveFormsModule,
    PipesSharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TextFieldModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('')
    }
  ]
})
export class ProductosModule { }
