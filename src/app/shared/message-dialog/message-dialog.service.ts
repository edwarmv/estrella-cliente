import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MessageDialogComponent,
  MessageDialogData
} from './message-dialog.component';

type Config = {
  maxHeight?: string,
  maxWidth?: string,
};

@Injectable()
export class MessageDialogService {

  constructor(private dialog: MatDialog) {
  }

  openDialog(
    data: MessageDialogData,
    config: Config = { },
  ): MatDialogRef<MessageDialogComponent, boolean> {
    const { maxHeight, maxWidth }: Config = config;
    const dialogRef = this.dialog.open(
      MessageDialogComponent,
      {
        data,
        maxHeight: maxHeight ? maxHeight : 'auto',
        maxWidth: maxWidth ? maxWidth : '80vw',
      }
    );

    return dialogRef;
  }
}
