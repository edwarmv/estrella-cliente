import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type MessageDialogData = {
  title: string,
  message?: string,
  messageDialogConfig?: MessageDialogConfig
};

type MessageDialogConfig = {
  showConfirmButton?: boolean,
  confirmButtonText?: string,
  confirmButtonColor?: 'primary' | 'accent' | 'warn',
  showCancelButton?: boolean,
  cancelButtonText?: string,
  cancelButtonColor?: 'primary' | 'accent' | 'warn',
};

type Result = {
  isConfirmed: boolean,
};

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  showConfirmButton = true;
  confirmButtonText = 'Aceptar';
  confirmButtonColor = '';
  showCancelButton = false;
  cancelButtonText = 'Cancelar';
  cancelButtonColor = '';

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) { }

  ngOnInit(): void {
    if (this.data.messageDialogConfig) {
      const {
        showConfirmButton,
        confirmButtonText,
        confirmButtonColor,
        showCancelButton,
        cancelButtonText,
        cancelButtonColor,
      } = this.data.messageDialogConfig;
      this.showConfirmButton = showConfirmButton ? showConfirmButton : true;
      this.confirmButtonText = confirmButtonText ?
        confirmButtonText : 'Aceptar';
      this.confirmButtonColor = confirmButtonColor ? confirmButtonColor : '';
      this.showCancelButton = showCancelButton ? showCancelButton : false;
      this.cancelButtonText = cancelButtonText ? cancelButtonText : 'Cancelar';
      this.cancelButtonColor = cancelButtonColor ? cancelButtonColor : '';
    }
  }

  closeDialog(isConfirmed: boolean): void {
    // const result: Result = {
    //   isConfirmed,
    // };
    this.dialogRef.close(isConfirmed);
  }

}
