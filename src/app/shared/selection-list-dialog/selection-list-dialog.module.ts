import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SelectionListDialogComponent
} from './selection-list-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectionListDialogService } from './selection-list-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [ SelectionListDialogComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ScrollingModule,
    LayoutModule,
  ],
  providers: [ SelectionListDialogService ],
  exports: [ SelectionListDialogComponent ]
})
export class SelectionListDialogModule { }
