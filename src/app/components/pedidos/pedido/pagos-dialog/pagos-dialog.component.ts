import { Component, Inject, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagoPedido } from '@models/pago-pedido.model';
import { PagoPedidoService } from '@services/pago-pedido.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Big } from 'big.js';
import { PedidoService } from '@services/pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type PagosDialogData = {
  idPedido: number,
  total: number,
  disabled: boolean,
}

@Component({
  selector: 'app-pagos-dialog',
  templateUrl: './pagos-dialog.component.html',
  styleUrls: ['./pagos-dialog.component.scss']
})
export class PagosDialogComponent implements OnInit {
  pagos$: Observable<PagoPedido[]>;
  showPagoForm = false;
  pagoForm: FormGroup;
  fetchPagosSubject = new BehaviorSubject<void>(null);

  // deuda
  cancelado: number;
  total: number;
  saldo: number;

  constructor(
    public dialogRef: MatDialogRef<PagosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PagosDialogData,
    private pagosPedidoService: PagoPedidoService,
    private pedidoService: PedidoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.total = this.data.total;

    this.pagoForm = this.fb.group({
      id: [],
      fechaPago: [],
      monto: [0, [Validators.required, Validators.min(0)]],
      pedido: this.fb.group({
        id: []
      })
    });

    this.pagos$ = this.fetchPagosSubject.pipe(
      switchMap(() => {
        return this.pagosPedidoService
        .obtenerPagos(this.data.idPedido)
        .pipe(map(resp => {

          this.cancelado = resp.pagosPedido.reduce((prev, curr) => new Big(prev).plus(curr.monto).toNumber(), 0);

          this.pedidoService.obtenerDetallesPedido(this.data.idPedido)
          .subscribe(detallesPedidoResp => {
            this.total = detallesPedidoResp.detallesPedido.reduce((prev, curr) => {
              return new Big(prev).plus(new Big(curr.precioUnitario).times(curr.cantidad)).toNumber();
            }, 0)
          })

          this.saldo = new Big(this.total).minus(this.cancelado).toNumber();

          return resp.pagosPedido;
        }));
      })
    )
  }

  selectPago(pago: PagoPedido): void {
    if (!this.data.disabled) {
      this.pagoForm.setValue({
        id: pago.id,
        fechaPago: pago.fechaPago,
        monto: pago.monto,
        pedido: {
          id: this.data.idPedido
        }
      });
      this.showPagoForm = true;
    }
  }

  registrarPago(): void {
    if (this.pagoForm.valid) {
      this.pagosPedidoService.registrarPago(this.pagoForm.value)
      .subscribe(resp => {
        this.fetchPagosSubject.next();
        this.pagoForm.get('id').setValue(resp.pagoPedido.id);
        this.pagoForm.get('fechaPago').setValue(resp.pagoPedido.fechaPago)
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      })
    }
  }

  resetForm(): void {
    this.pagoForm.reset();
    this.showPagoForm = true;
    this.pagoForm.get('pedido').get('id').setValue(this.data.idPedido);
  }

  actualizarPago(): void {
    if (this.pagoForm.valid) {
      this.pagosPedidoService.actualizarPago(this.pagoForm.value)
      .subscribe(resp => {
        this.fetchPagosSubject.next();
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 })
      })
    }
  }

  eliminarPago(idPago: number): void {
    this.pagosPedidoService.borrarPago(idPago, this.data.idPedido)
    .subscribe(resp => {
      this.fetchPagosSubject.next();
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }
}
