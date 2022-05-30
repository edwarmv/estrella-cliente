import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalesComponent } from './sucursales.component';
import { RouterModule, Routes } from '@angular/router';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { TabsModule } from '@shared/tabs/tabs.module';
import { MatButtonModule } from '@angular/material/button';
import { SucursalComponent } from './lista-sucursales/sucursal/sucursal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from '@shared/table/table.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MasInformacionDialogComponent } from './lista-sucursales/mas-informacion-dialog/mas-informacion-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListaCajasComponent } from './lista-cajas/lista-cajas.component';
import { CajaComponent } from './lista-cajas/caja/caja.component';
import { SelectionListDialogModule } from '@shared/selection-list-dialog/selection-list-dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MovimientosCajasComponent } from './movimientos-cajas/movimientos-cajas.component';
import { RouterOutletComponent } from '@components/router-outlet/router-outlet.component';
import { MessageDialogModule } from '@shared/message-dialog/message-dialog.module';

const routes: Routes = [
  {
    path: '',
    component: SucursalesComponent,
    children: [
      {
        path: 'lista-sucursales',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Lista de sucursales' },
        children: [
          {
            path: '',
            component: ListaSucursalesComponent
          },
          {
            path: 'nueva-sucursal',
            component: SucursalComponent,
            data: { breadcrumb: 'Nueva sucursal' },
          },
          {
            path: ':idSucursal',
            component: SucursalComponent,
            data: { breadcrumb: 'Editar sucursal' },
          },
        ],
      },
      {
        path: 'lista-cajas',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Lista de cajas' },
        children: [
          {
            path: '',
            component: ListaCajasComponent,
          },
          {
            path: 'nueva-caja',
            component: CajaComponent,
            data: { breadcrumb: 'Nueva caja' },
          },
          {
            path: ':idCaja',
            component: CajaComponent,
            data: { breadcrumb: 'Editar caja' },
          },
        ]
      },
      {
        path: 'movimientos-cajas',
        component: RouterOutletComponent,
        data: { breadcrumb: 'Movimientos en cajas' },
        children: [
          {
            path: '',
            component: MovimientosCajasComponent,
          }
        ]
      },
      { path: '', redirectTo: 'lista-sucursales', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    SucursalesComponent,
    ListaSucursalesComponent,
    SucursalComponent,
    MasInformacionDialogComponent,
    ListaSucursalesComponent,
    ListaCajasComponent,
    CajaComponent,
    MovimientosCajasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    TableModule,
    SelectionListDialogModule,
    MessageDialogModule,
  ],
})
export class SucursalesModule {}
