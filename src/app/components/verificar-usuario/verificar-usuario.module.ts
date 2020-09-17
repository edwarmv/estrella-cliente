import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarUsuarioComponent } from './verificar-usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: VerificarUsuarioComponent
  }
];

@NgModule({
  declarations: [VerificarUsuarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class VerificarUsuarioModule { }
