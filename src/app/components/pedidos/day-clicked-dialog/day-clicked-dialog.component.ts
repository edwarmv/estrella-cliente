import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

type Data = { date: Date, events: CalendarEvent[] };

@Component({
  selector: 'app-day-clicked-dialog',
  templateUrl: './day-clicked-dialog.component.html',
  styleUrls: ['./day-clicked-dialog.component.scss']
})
export class DayClickedDialogComponent implements OnInit {
  title: string;

  events: CalendarEvent[];

  constructor(
    public dialogRef: MatDialogRef<DayClickedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.title = new Intl.DateTimeFormat(
      'es-BO',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    ).format(this.data.date);

    this.events = this.data.events;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
