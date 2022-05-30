import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PagosDialogComponent, PagosDialogData } from './pagos-dialog.component';

@Injectable()
export class PagosDialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialog(idPedido: number, total: number, disabled: boolean): MatDialogRef<PagosDialogComponent> {
    return this.dialog.open<PagosDialogComponent, PagosDialogData>(PagosDialogComponent, {
      data: {
        idPedido,
        total,
        disabled,
      }
    });
  }
}
