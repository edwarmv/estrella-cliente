import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClienteComponent } from './cliente/cliente.component';



@NgModule({
  declarations: [ClientesComponent, ClienteComponent],
  imports: [
    CommonModule
  ]
})
export class ClientesModule { }
