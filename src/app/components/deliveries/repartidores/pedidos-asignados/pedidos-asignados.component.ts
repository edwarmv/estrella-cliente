import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colors } from '@components/pedidos/colors';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { CalendarEventsCB } from '@shared/calendar/calendar.component';
import { Column } from '@shared/table/column.interface';
import { Row } from '@shared/table/row.interface';
import { ServerDataSourceCB } from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-asignados',
  templateUrl: './pedidos-asignados.component.html',
  styleUrls: ['./pedidos-asignados.component.scss']
})
export class PedidosAsignadosComponent implements OnInit {
  idRepartidor: number;

  // calendar
  pedidosCB: CalendarEventsCB<Pedido>;

  // Tabla de todos los pedidos
  pedidosTableCB: ServerDataSourceCB<Pedido>;
  tableColumns: Column[] = [
    {
      name: 'No.',
      type: 'index'
    },
    {
      name: 'Cliente',
      type: 'customColumn'
    },
    {
      name: 'Fecha de entrega',
      type: 'customColumn'
    },
    {
      name: 'Ver pedido',
      type: 'customColumn'
    }
  ];

  @ViewChild('clienteColumn', { static: true })
  clienteColumn: TemplateRef<any>;

  @ViewChild('fechaEntregaColumn', { static: true })
  fechaEntregaColumn: TemplateRef<any>;

  @ViewChild('verPedidoColumn', { static: true })
  verPedidoColumn: TemplateRef<any>;

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.clienteColumn;
    this.tableColumns[2].template = this.fechaEntregaColumn;
    this.tableColumns[3].template = this.verPedidoColumn;

    this.idRepartidor = this.route.snapshot.params.idRepartidor;
    this.obtenerPedidosCB();
    this.obtenerPedidosTableCB();
  }

  obtenerPedidosCB(): void {
    this.pedidosCB = ({ start, end }) => {
      return this.pedidoService.obtenerPedidos({
        start,
        end,
        estado: EstadoPedido.LISTO,
        idRepartidor: this.idRepartidor
      })
      .pipe(
        map(resp => {
          console.log(start, end, resp);
          return resp.pedidos.map(pedido => {
            return {
              title: `${pedido.cliente.nombre} ${pedido.cliente.apellido}`,
              start: new Date(pedido.fechaEntrega),
              color: colors[pedido.estado],
              meta: pedido
            };
          });
        })
      );
    };
  }

  obtenerPedidosTableCB(): void {
    this.pedidosTableCB = ({ skip, take, termino }) => {
      return this.pedidoService.obtenerPedidos({
        skip,
        take,
        termino,
        estado: EstadoPedido.LISTO,
        idRepartidor: this.idRepartidor,
      }).pipe(
        map(resp => ({
          rows: resp.pedidos.map((pedido): Row<Pedido> => ({ values: pedido })),
          total: resp.total,
        }))
      );
    };
  }
}
