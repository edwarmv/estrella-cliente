import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MessageDialogComponent,
  DialogData
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
    data: DialogData,
    config: Config = { },
  ): MatDialogRef<MessageDialogComponent, any> {
    const { maxHeight, maxWidth }: Config = config;
    const dialogRef = this.dialog.open(
      MessageDialogComponent,
      {
        data,
        maxHeight: maxHeight ? maxHeight : 'auto',
        maxWidth: maxWidth ? maxWidth : 'auto',
      }
    );

    return dialogRef;
  }
}
