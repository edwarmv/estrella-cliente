import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB, ServerDataSourceCBRes } from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  pedidosCB: ServerDataSourceCB<Pedido>;
  tableColumns: Column[] = [
    { name: 'No.',              type: 'index'        },
    { name: 'Nombre',           type: 'customColumn' },
    { name: 'Fecha de entrega', type: 'customColumn' },
    { name: 'Estado',           type: 'customColumn' },
    { name: 'Detalles',         type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('fechaEntregaColumn', { static: true })
  fechaEntregaColumn: TemplateRef<any>;

  @ViewChild('estadoColumn', { static: true })
  estadoColumn: TemplateRef<any>;

  @ViewChild('detallesColumn', { static: true })
  detallesColumn: TemplateRef<any>;

  termino: string;

  filtroEstados = [
    'pendiente',
    'listo',
    'entregado',
    'completado',
  ];
  estado: EstadoPedido | '' = '';
  showFiltros = false;

  constructor(
    private pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.fechaEntregaColumn;
    this.tableColumns[3].template = this.estadoColumn;
    this.tableColumns[4].template = this.detallesColumn;

    this.pedidosCB = this.obtenerPedidosCB();
  }

  filtrarPedidos(): void {
    this.pedidosCB = this.obtenerPedidosCB();
  }

  obtenerPedidosCB(): ServerDataSourceCB<Pedido> {
    return ({
      take,
      skip,
      termino,
    }) => {
      return this.pedidoService.obtenerPedidos({
        skip,
        take,
        estado: this.estado,
        termino,
      }).pipe(
        map((res): ServerDataSourceCBRes<Pedido> => ({
          rows: res.pedidos.map(pedido => ({ values: pedido })),
          total: res.total,
        }))
      );
    };
  }
}
