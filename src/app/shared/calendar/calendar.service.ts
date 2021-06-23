import { Injectable } from '@angular/core';
import { CalendarModule } from './calendar.module';

@Injectable({
  providedIn: CalendarModule
})
export class CalendarService {
  viewDate = Date;

  constructor() { }
}
