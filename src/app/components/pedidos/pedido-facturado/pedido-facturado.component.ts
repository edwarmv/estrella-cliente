import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { take } from 'rxjs/operators';
import { format } from 'date-fns';
import { Big } from 'big.js';

@Component({
  selector: 'app-pedido-facturado',
  templateUrl: './pedido-facturado.component.html',
  styleUrls: ['./pedido-facturado.component.scss']
})
export class PedidoFacturadoComponent implements OnInit {
  idPedido: number;
  pedidoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this.idPedido = this.route.snapshot.params.id;

    this.pedidoForm = this.fb.group({
      id: [''],
      cliente: this.fb.group({
        nombre: [''],
        apellido: [''],
        nitCI: [''],
      }),
      factura: this.fb.group({
        numeroFactura: [''],
        fechaEmision: [''],
        anulado: [''],
      }),
      detallesPedidos: this.fb.array([]),
    });

    this.loadPedido();

  }

  loadPedido(): void {
    this.pedidoService.pedidoFacturado(this.idPedido)
    .pipe(take(1))
    .subscribe(pedido => {
      this.pedidoForm.patchValue({
        id: pedido.id,
        cliente: pedido.cliente,
        factura: {
          numeroFactura: pedido.factura.numeroFactura,
          fechaEmision: format(new Date(pedido.factura.fechaEmision), 'yyyy-MM-dd'),
          aulado: pedido.factura.anulado
        }
      });

      pedido.detallesPedidos.forEach(detallePedido => {
        const detallePedidoControl = this.fb.group({
          producto: this.fb.group({
            nombre: [detallePedido.producto.nombre],
          }),
          precioUnitario: [detallePedido.precioUnitario],
          cantidad: [detallePedido.cantidad],
          total: [
            new Big(detallePedido.precioUnitario)
              .times(detallePedido.cantidad)
              .toFixed(2)
          ]
        });

        this.detallesPedidos.push(detallePedidoControl);
      });

      console.log(this.pedidoForm);
    });
  }

  get detallesPedidos(): FormArray {
    return this.pedidoForm.get('detallesPedidos') as FormArray;
  }
}
