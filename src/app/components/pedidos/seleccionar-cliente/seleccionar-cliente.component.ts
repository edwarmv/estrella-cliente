import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '@models/cliente.model';
import { ClienteService } from '@services/cliente.service';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  buscador: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SeleccionarClienteComponent>,
    private clienteService: ClienteService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buscador = this.fb.group({
      termino: ['']
    });

    this.clientes$ = this.termino.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(termino => {
        return this.clienteService.obtenerClientes(0, 0, termino)
        .pipe(
          map(resp => resp.clientes)
        );
      })
    );
  }

  seleccionarCliente(cliente: Cliente): void {
    this.dialogRef.close(cliente);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get termino(): AbstractControl {
    return this.buscador.get('termino');
  }
}
