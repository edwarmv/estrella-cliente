import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { RouterModule, Routes } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CasaMatrizComponent } from './casa-matriz/casa-matriz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GeneradorCodigoControlComponent } from './generador-codigo-control/generador-codigo-control.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionComponent
  },
  {
    path: 'casa-matriz',
    component: CasaMatrizComponent,
    data: {
      breadcrumb: 'Casa matriz'
    }
  },
  {
    path: 'generador-codigo-control',
    component: GeneradorCodigoControlComponent,
    data: {
      breadcrumb: 'Generador de código de control'
    }
  }
];

@NgModule({
  declarations: [
    ConfiguracionComponent,
    CasaMatrizComponent,
    GeneradorCodigoControlComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class ConfiguracionModule { }
