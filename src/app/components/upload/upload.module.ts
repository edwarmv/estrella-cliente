import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogComponent } from './dialog/dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { UploadComponent } from './upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadService } from './upload.service';


@NgModule({
  declarations: [ UploadComponent, DialogComponent ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    MatProgressBarModule
  ],
  exports: [ UploadComponent ],
  providers: [ UploadService ]
})
export class UploadModule { }
