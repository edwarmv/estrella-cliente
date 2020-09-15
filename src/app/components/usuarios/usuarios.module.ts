import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  }
];

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsuariosModule { }
