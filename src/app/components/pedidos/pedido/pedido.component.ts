import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '@models/cliente.model';
import { Producto } from '@models/producto.model';
import { ClienteService } from '@services/cliente.service';
import { PedidoService } from '@services/pedido.service';
import { UsuarioService } from '@services/usuario.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import {
  SeleccionarClienteComponent
} from '../seleccionar-cliente/seleccionar-cliente.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit, OnDestroy {
  pedidoForm: FormGroup;
  clientes$: Observable<Cliente[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      usuario: this.fb.group({
        id: []
      }),
      cliente: this.fb.group({
        id: [undefined, [Validators.required]],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        nitCI: ['', [Validators.required]],
      }),
      conServicioEntrega: [false],
      direccionEntrega: [''],
      fechaEntrega: [undefined, [Validators.required]],
      detallesPedidos: this.fb.array([], this.validateSize),
      total: [0]
    });

    this.establecerUsuario();

    this.clientes$ = this.cliente.valueChanges
    .pipe(
      debounceTime(500),
      startWith(''),
      switchMap(value => {
        return this.clienteService.obtenerClientes(0, 0, value)
        .pipe(map(resp => resp.clientes));
      })
    );
  }

  private validateSize(formArray: FormArray): { invalidSize: boolean } {
    return formArray.length > 0 ? null : { invalidSize: true };
  }

  abrirSeleccionarCliente(): void {
    const dialogRef = this.dialog.open(SeleccionarClienteComponent);

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe((resp: Cliente) => {
      if (resp) {
        console.log(resp);
        this.cliente.patchValue(resp);
        this.direccionEntrega.setValue(resp.direccionDomicilio);
        this.cliente.markAsDirty();
      }
    });
  }

  abrirAgregarProducto(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent);

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe((producto: Producto) => {
      if (producto) {
        console.log(producto);
        this.agregarProducto(producto);
      }
    });
  }

  agregarProducto(producto: Producto): void {
    const detallePedido = this.fb.group({
      producto: this.fb.group({
        id: [producto.id],
        nombre: [producto.nombre]
      }),
      precioUnitario: [producto.precio],
      cantidad: [
        0,
        [
          Validators.required,
          Validators.min(1),
          this.onlyInteger
        ]
      ],
      subtotal: [0],
    });

    // Calculamos el subtotal
    let subtotalPrevio = 0;
    detallePedido.get('cantidad').valueChanges
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(cantidad => {
      if (cantidad) {
        const subtotal = cantidad * producto.precio;
        detallePedido.get('subtotal').setValue(subtotal.toFixed(2));
        const total = this.total.value - subtotalPrevio + subtotal;
        this.total.setValue(total.toFixed(2));
        subtotalPrevio = subtotal;
      } else {
        detallePedido.get('subtotal').setValue(0);
      }
    });

    this.detallesPedidos.push(detallePedido);
  }

  private onlyInteger(cantidad: AbstractControl): { noInteger: boolean } {
    const value = cantidad.value;
    return value % 1 === 0 ? null : { noInteger: true };
  }

  registrarPedido(): void {
    console.log(this.pedidoForm);
    this.cliente.markAsTouched();
    this.detallesPedidos.markAsTouched();
    if (this.pedidoForm.valid) {
      if (!this.conServicioEntrega.value) {
        this.direccionEntrega.setValue('');
      }
      this.pedidoService.crear(this.pedidoForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(resp => {
        this.resetPedidoForm();
        this.establecerUsuario();
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

 eliminarProducto(index: number): void {
    const subtotal = this.detallesPedidos
    .get(index.toString())
    .get('subtotal').value;
    const total = this.total.value - subtotal;
    this.total.setValue(total.toFixed(2));
    this.detallesPedidos.removeAt(index);
  }

  obtenerDetallePedido(index: number): AbstractControl {
    return this.detallesPedidos.get(index.toString());
  }

  resetPedidoForm(): void {
    this.detallesPedidos.clear();
    this.cliente.reset();
    this.detallesPedidos.reset();
    this.pedidoForm.reset();
  }

  establecerUsuario(): void {
    this.usuarioService.usuario
    .pipe(take(1))
    .subscribe(usuario => {
      this.usuario.get('id').setValue(usuario.id);
    });
  }

  get usuario(): AbstractControl {
    return this.pedidoForm.get('usuario');
  }

  get cliente(): FormGroup {
    return this.pedidoForm.get('cliente') as FormGroup;
  }

  get conServicioEntrega(): AbstractControl {
    return this.pedidoForm.get('conServicioEntrega');
  }

  get direccionEntrega(): AbstractControl {
    return this.pedidoForm.get('direccionEntrega');
  }

  get detallesPedidos(): FormArray {
    return this.pedidoForm.get('detallesPedidos') as FormArray;
  }

  get total(): AbstractControl {
    return this.pedidoForm.get('total');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
