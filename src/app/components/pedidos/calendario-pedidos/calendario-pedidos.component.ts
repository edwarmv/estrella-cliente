import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { map } from 'rxjs/operators';
import { colors } from '../colors';
import { Column } from '@shared/table/column.interface';
import { Row } from '@shared/table/row.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-calendario-pedidos',
  templateUrl: './calendario-pedidos.component.html',
  styleUrls: ['./calendario-pedidos.component.scss']
})
export class CalendarioPedidosComponent implements OnInit {
  // calendar
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate = new Date();
  activeDayIsOpen = false;
  pedidos$: Observable<CalendarEvent<{ pedido: Pedido }>[]>;

  // table
  pageIndex = 0;
  pageSize = 5;
  totalPedidosTable: number;
  pedidosTable: Row<Pedido>[];
  tableColumns: Column[] = [
    { name: 'No.',               type: 'index'        },
    { name: 'Cliente',           type: 'customColumn' },
    { name: 'Estado',            type: 'customColumn' },
    { name: 'Fecha de registro', type: 'customColumn' },
    { name: 'Fecha de entrega',  type: 'customColumn' },
    { name: 'Ver pedido',        type: 'customColumn' },
  ];

  @ViewChild('clienteColumn', { static: true })
  clienteColumn: TemplateRef<any>;

  @ViewChild('estadoColumn', { static: true })
  estadoColumn: TemplateRef<any>;

  @ViewChild('fechaRegistroColumn', { static: true })
  fechaRegistroColumn: TemplateRef<any>;

  @ViewChild('fechaEntregaColumn', { static: true })
  fechaEntregaColumn: TemplateRef<any>;

  @ViewChild('verPedidoColumn', { static: true })
  verPedidoColumn: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    private pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this.obtenerPedidos();

    this.tableColumns[1].template = this.clienteColumn;
    this.tableColumns[2].template = this.estadoColumn;
    this.tableColumns[3].template = this.fechaRegistroColumn;
    this.tableColumns[4].template = this.fechaEntregaColumn;
    this.tableColumns[5].template = this.verPedidoColumn;

    // this.pedidosTable$ = this.obtenerPedidosTable(0, this.pageSize);
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

    this.pedidos$ = this.pedidoService.obtenerPedidos({ start, end })
    .pipe(
      map(result => {
        return result.pedidos.map(pedido => {
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

  dayClicked({ events }: { date: Date, events: CalendarEvent[]}): void {
    console.log('calendarEvent', events);
    this.pedidosTable = events.map((event): Row<Pedido> => {
      return { values: event.meta.pedido };
    });
  }

  obtenerPedidosTable(skip: number, take: number): Observable<Row<Pedido>[]> {
    return this.pedidoService.obtenerPedidos({
      skip,
      take,
    }).pipe(
      map(resp => {
        this.totalPedidosTable = resp.total;
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

    // this.pedidosTable$ = this.obtenerPedidosTable(skip, take);
  }
}
