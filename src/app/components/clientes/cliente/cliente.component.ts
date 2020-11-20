import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '@models/cliente.model';
import { ClienteService } from '@services/cliente.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  idCliente: number;
  cliente: Cliente;
  clienteForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      nitCI: ['', [Validators.required]],
      telefonoFijo: [''],
      telefonoMovil: [''],
      direccionDomicilio: ['']
    });

    this.idCliente = this.route.snapshot.params.id;

    if (this.idCliente) {
      this.actualizarFormulario(this.idCliente);
    }
  }

  actualizarFormulario(idCliente: number): void {
    this.clienteService.obtenerCliente(idCliente)
    .pipe(take(1))
    .subscribe(cliente => {
      if (cliente) {
        this.cliente = cliente;
        this.clienteForm.patchValue(cliente);
      }
    });
  }

  actualiarCliente(): void {
    console.log(this.clienteForm);
    if (this.clienteForm.valid) {
      this.clienteService.actualizar(this.idCliente, this.clienteForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

  crearCliente(): void {
    console.log(this.clienteForm);
    if (this.clienteForm.valid) {
      this.clienteService.crear(this.clienteForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

  get nombre(): AbstractControl {
    return this.clienteForm.get('nombre');
  }

  get apellido(): AbstractControl {
    return this.clienteForm.get('apellido');
  }

  get nitCI(): AbstractControl {
    return this.clienteForm.get('nitCI');
  }
}
