import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  formatISO,
  getISODay,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays
} from 'date-fns';
import { Observable } from 'rxjs';

export type CalendarEventsCB<T> = (
  { start, end }: { start: string, end: string}
) => Observable<CalendarEvent<T>[]>;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input('eventsCB') set _eventsCB(cb: CalendarEventsCB<any>) {
    this.eventsCB = cb;
    this.fetchData();
  }
  @Output() eventsCBChange = new EventEmitter<void>();
  eventsCB: CalendarEventsCB<any>;
  events$: Observable<CalendarEvent<any>[]>;


  @Input() view = CalendarView.Month;
  @Output('viewChange') _viewChange = new EventEmitter<CalendarView>();

  @Input() viewDate: Date = new Date();
  @Output('viewDateChange') _viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

  activeDayIsOpen = false;

  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent,
  }>();

  @Output('eventTimesChanged') _eventTimesChanged =
    new EventEmitter<CalendarEventTimesChangedEvent>();

  @Output('dayClicked') dayClickedOutput = new EventEmitter<{
    date: Date, events: CalendarEvent[]
  }>();

  mediaQueryList: MediaQueryList;
  private mediaQueryListener: () => void;

  constructor(
    private mediaMatcher: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 749px)');
    this.mediaQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
  }

  viewChange(view: CalendarView, eventsChange: boolean = false): void {
    this.view = view;
    this._viewChange.emit(view);
    if (eventsChange) {
      this.fetchData();
      this.eventsCBChange.emit();
    }
  }

  viewDateChange(date: Date, eventsCBChange: boolean = false): void {
    this.viewDate = date;
    this._viewDateChange.emit(date);
    if (eventsCBChange) {
      this.fetchData();
      this.eventsCBChange.emit();
    }
  }

  eventTimesChanged(event: CalendarEventTimesChangedEvent): void {
    this.fetchData();
    this._eventTimesChanged.emit(event);
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
    this.viewDateChange(this.viewDate, true);
  }

  dayClicked(
    { date, events }: { date: Date, events: CalendarEvent[] }
  ): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDateChange(date);
    } else {
      if (events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDateChange(date, true);
    }
    this.dayClickedOutput.emit({ date, events });
  }

  fetchData(): void {
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

    let start: string = this.formatDate(getStart(this.viewDate));
    let end: string = this.formatDate(getEnd(this.viewDate));

    if (this.view === 'month') {
      const startDay: number = getISODay(getStart(this.viewDate)) - 1;
      const endDay: number = 7 - getISODay(getEnd(this.viewDate));
      start =  this.formatDate(subDays(getStart(this.viewDate), startDay));
      end =  this.formatDate(addDays(getEnd(this.viewDate), endDay));
    }

    this.events$ = this.eventsCB({ start, end });
  }

  formatDate(date: Date): string {
    return formatISO(date, { representation: 'date' });
  }
}
