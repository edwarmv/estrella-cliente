import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { map } from 'rxjs/operators';
import { colors } from '../colors';
import { EventClickedDialogComponent } from './event-clicked-dialog/event-clicked-dialog.component';
import { CalendarEventsCB } from '@shared/calendar/calendar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendario-pedidos',
  templateUrl: './calendario-pedidos.component.html',
  styleUrls: ['./calendario-pedidos.component.scss']
})
export class CalendarioPedidosComponent implements OnInit {
  // calendar
  pedidosCB: CalendarEventsCB<Pedido>;
  showFiltros = false;
  estado: EstadoPedido | '' = '';
  filtroEstados = Object.values(EstadoPedido);


  constructor(
    public dialog: MatDialog,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.obtenerPedidos();
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    this.pedidosCB = ({ start, end }) => {
      return this.pedidoService.obtenerPedidos({ start, end, estado: this.estado })
      .pipe(
        map(result => {
          return result.pedidos.map(pedido => {
            return {
              title: `${pedido.cliente.nombre} ${pedido.cliente.apellido} #${pedido.id}${pedido.factura ? pedido.factura.anulado ? ' (factura-anulada)' : ' (facturado)' : ''}`,
              start: new Date(pedido.fechaEntrega),
              color: colors[pedido.estado],
              meta: pedido,
              draggable: true
            };
          });
        })
      );
    };
  }

  dayClicked({ events }: { date: Date, events: CalendarEvent[]}): void {
    console.log('dayClicked', events);
    // this.obtenerPedidos();
  }

  eventClicked({ event }: { event: CalendarEvent<Pedido> }): void {
    console.log(event.meta);
    this.dialog.open(EventClickedDialogComponent, { data: event });
  }

  eventTimesChanged(
    {
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent
  ): void {
    console.log({ event, newStart, newEnd });

    const pedido: Pedido = event.meta;

    this.pedidoService
    .actualizar({ id: pedido.id, fechaEntrega: newStart } as Pedido)
    .subscribe(resp => {
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }
}
