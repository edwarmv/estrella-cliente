import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MessageDialogComponent } from './message-dialog.component';
import { MessageDialogService } from './message-dialog.service';

@NgModule({
  declarations: [MessageDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [MessageDialogComponent],
  entryComponents: [MessageDialogComponent],
  providers: [MessageDialogService]
})
export class MessageDialogModule { }
