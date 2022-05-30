import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from '@models/pedido.model';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-event-clicked-dialog',
  templateUrl: './event-clicked-dialog.component.html',
  styleUrls: ['./event-clicked-dialog.component.scss']
})
export class EventClickedDialogComponent implements OnInit {
  event: CalendarEvent<Pedido>;
  pedido: Pedido;

  constructor(
    public dialogRef: MatDialogRef<EventClickedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEvent<Pedido>,
  ) { }

  ngOnInit(): void {
    // this.title = new Intl.DateTimeFormat(
    //   'es-BO',
    //   {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    //   }
    // ).format(this.data.date);

    this.event = this.data;
    this.pedido = this.data.meta;
    console.log(this.event);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
