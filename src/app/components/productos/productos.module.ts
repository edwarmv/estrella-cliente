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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductosViewComponent } from './productos-view/productos-view.component';
import { TabsModule } from '@shared/tabs/tabs.module';
import { CategoriasProductosComponent } from './categorias-productos/categorias-productos.component';
import { CategoriaProductoComponentDialog } from './categorias-productos/categoria-producto-dialog/categoria-producto-dialog.component';
import { TableModule } from '@shared/table/table.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionListDialogModule } from '@shared/selection-list-dialog/selection-list-dialog.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      { path: 'view', component: ProductosViewComponent },
      {
        path: 'categorias',
        children: [
          { path: '', component: CategoriasProductosComponent },
        ]
      },
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
      },
      { path: '', redirectTo: 'view', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  declarations: [
    ProductosComponent,
    ProductoComponent,
    DetallesProductoDialogComponent,
    ProductosViewComponent,
    CategoriasProductosComponent,
    CategoriaProductoComponentDialog
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    TabsModule,
    TableModule,
    SelectionListDialogModule,
    MatChipsModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('')
    }
  ]
})
export class ProductosModule { }
