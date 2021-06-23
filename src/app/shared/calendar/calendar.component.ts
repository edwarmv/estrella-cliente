import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('events') events$: Observable<any>;

  @Input() view = CalendarView.Month;
  @Output() viewChange = new EventEmitter<CalendarView>();

  @Input() viewDate: Date;
  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

  activeDayIsOpen = false;

  @Output() handleEvent = new EventEmitter<{
    event: CalendarEvent,
  }>();

  // tslint:disable-next-line: no-output-rename
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

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
    this.viewDateChange.emit(this.viewDate);
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
    }
    this.viewDate = date;
    this.dayClickedOutput.emit({ date, events });
  }

}
