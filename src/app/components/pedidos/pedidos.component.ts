import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfMonth,
  format,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  DayClickedDialogComponent
} from './day-clicked-dialog/day-clicked-dialog.component';
import { Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { map } from 'rxjs/operators';
import { MessageDialogService } from '@components/message-dialog/message-dialog.service';
import { colors } from './colors';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit, OnDestroy {

  mediaQueryList: MediaQueryList;
  private mediaQueryListener: () => void;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  activeDayIsOpen = false;

  refresh: Subject<any> = new Subject();

  // actions: CalendarEventAction[] = [
    // {
      // label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      // a11yLabel: 'Edit',
      // onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event);
      // },
    // },
    // {
      // label: '<i class="fas fa-fw fa-trash-alt"></i>',
      // a11yLabel: 'Delete',
      // onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        // this.handleEvent('Deleted', event);
      // },
    // },
  // ];

  pedidos$: Observable<CalendarEvent<{ pedido: Pedido }>[]>;
  events: Pedido[] = [];
  tableColumns: string[] = [
    'cliente',
    'estado',
    'fechaRegistro',
    'fechaEntrega',
    'verPedido'
  ];

  constructor(
    private mediaMatcher: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private pedidoService: PedidoService,
    private messageDialogService: MessageDialogService,
  ) { }

  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 749px)');
    this.mediaQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
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

    console.log('start: ', start, 'end: ', end);

    this.pedidos$ = this.pedidoService.obtenerPedidos({ start, end })
    .pipe(
      map(result => {
        console.log(result);
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

  dayClicked(
    { date, events }: {
      date: Date,
      events: CalendarEvent<{ pedido: Pedido }>[]
    }
  ): void {
    console.log('date', date);
    console.log('events', events);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.events = [];
        this.activeDayIsOpen = false;
      } else {
        this.events = events.map(event => event.meta.pedido);
        console.log(this.events);
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

    // if (events.length === 0) {
      // this.messageDialogService.openDialog({
        // title: format(
          // date,
          // 'EEEE\',\' d \'de\' MMMM \'de\' yyyy',
          // { locale: esLocale }
        // ),
        // message: '¿Registrar nuevo pedido?',
        // messageDialogConfig: {
          // confirmButtonText: 'Si',
          // confirmButtonColor: 'primary',
          // showCancelButton: true,
        // }
      // });
    // }
  }

  // eventTimesChanged({
    // event,
    // newStart,
    // newEnd,
  // }: CalendarEventTimesChangedEvent): void {
    // this.events = this.events.map((iEvent) => {
      // if (iEvent === event) {
        // return {
          // ...event,
          // start: newStart,
          // end: newEnd,
        // };
      // }
      // return iEvent;
    // });
    // this.handleEvent('Dropped or resized', event);
  // }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
  }
}
