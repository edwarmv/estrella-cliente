import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { EstadoPedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';

@Component({
  selector: 'app-reportes-pedidos',
  templateUrl: './reportes-pedidos.component.html',
  styleUrls: ['./reportes-pedidos.component.scss']
})
export class ReportesPedidosComponent implements OnInit {
  reporteForm: FormGroup;
  estadosPedido = Object.values(EstadoPedido);

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      estado: [''],
      numeroRegistros: [10]
    });
  }

  generarReporte(): void {
    console.log(this.reporteForm);
    const url = this.pedidoService.reporte(
      this.estado.value,
      this.numeroRegistros.value
    );
    window.open(url, '_blank');
  }

  get estado(): AbstractControl {
    return this.reporteForm.get('estado');
  }

  get numeroRegistros(): AbstractControl {
    return this.reporteForm.get('numeroRegistros');
  }
}
