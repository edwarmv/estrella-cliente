import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    SelectionListData,
  SelectionListDialogComponent
} from './selection-list-dialog.component';

@Injectable()
export class SelectionListDialogService {
  dialogRef: MatDialogRef<SelectionListDialogComponent>;
  private height = '80vh';

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.WebLandscape,
    ])
    .subscribe(resp => {
      if (resp.breakpoints[Breakpoints.HandsetPortrait] === true) {
        this.height = '60vh';
      }

      if (resp.breakpoints[Breakpoints.HandsetLandscape] === true) {
        this.height = '80vh';
      }

      if (resp.breakpoints[Breakpoints.TabletPortrait] === true) {
        this.height = '40vh';
      }

      if (resp.breakpoints[Breakpoints.WebLandscape] === true) {
        this.height = '40vh';
      }
    });
  }

  /**
   * Abre una ventana flotante en la que se puede seleccionar un item
   * @return Devuelve el item seleccionado
   */
  open<T>(data: SelectionListData): Observable<T> {
    const dialogRef = this.dialog.open(
      SelectionListDialogComponent,
      {
        data,
        height: this.height,
      }
    );

    return dialogRef.afterClosed().pipe(
      map((resp: T) => resp)
    );
  }
}
