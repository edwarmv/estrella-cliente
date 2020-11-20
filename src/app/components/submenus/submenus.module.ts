import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmenuComponent } from './submenu/submenu.component';
import { SubmenusComponent } from './submenus.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { customPaginator } from '@components/paginator/custom.paginator';

const routes: Routes = [
  {
    path: '',
    component: SubmenusComponent
  },
  {
    path: 'nuevo-submenu',
    component: SubmenuComponent,
    data: {
      breadcrumb: 'Nuevo submenú'
    }
  },
  {
    path: ':id',
    component: SubmenuComponent,
    data: {
      breadcrumb: 'Modificar submenú'
    }
  }
];

@NgModule({
  declarations: [SubmenusComponent, SubmenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Submenús por página')
    }
  ]
})
export class SubmenusModule { }
