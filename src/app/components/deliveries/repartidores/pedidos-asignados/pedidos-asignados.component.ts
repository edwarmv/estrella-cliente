import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { colors } from '@components/pedidos/colors';
import { Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { Column } from '@shared/table/column.interface';
import { Row } from '@shared/table/row.interface';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-asignados',
  templateUrl: './pedidos-asignados.component.html',
  styleUrls: ['./pedidos-asignados.component.scss']
})
export class PedidosAsignadosComponent implements OnInit {
  idRepartidor: number;

  // calendar
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  calendarView = CalendarView;
  activeDayIsOpen = false;
  pedidos$: Observable<CalendarEvent<{ pedido: Pedido }>[]>;

  // Tabla de todos los pedidos
  pageIndex = 0;
  pageSize = 5;
  total: number;
  pedidosTable$: Observable<Row<Pedido>[]> =
    this.obtenerPedidosTable(0, this.pageSize);
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
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    const getStart = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const start = format(getStart(this.viewDate), 'yyyy-MM-dd');
    const end = format(getEnd(this.viewDate), 'yyyy-MM-dd');

    // const idRepartidor = this.route.snapshot.params.idRepartidor;
    console.log(this.idRepartidor);

    this.pedidos$ = this.pedidoService.obtenerPedidos({
      start,
      end,
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
            meta: {
              pedido
            }
          };
        });
      })
    );
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  obtenerPedidosTable(skip: number, take: number): Observable<Row<Pedido>[]> {
    return this.pedidoService.obtenerPedidos({
      skip,
      take,
    })
    .pipe(
      map(resp => {
        this.total = resp.total;
        return resp.pedidos.map((pedido): Row<Pedido> => {
          return { values: pedido };
        });
      })
    );
  }

  updateTable(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    const take = this.pageSize;
    const skip = this.pageIndex * take;

    this.pedidosTable$ = this.obtenerPedidosTable(skip, take);
  }
}
