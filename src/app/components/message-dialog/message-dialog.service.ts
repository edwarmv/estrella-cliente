import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MessageDialogComponent,
  DialogData
} from './message-dialog.component';

@Injectable()
export class MessageDialogService {

  constructor(private dialog: MatDialog) {
  }

  openDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(
      MessageDialogComponent,
      { data }
    );
  }
}
