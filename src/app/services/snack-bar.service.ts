import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  action = 'Aceptar';
  duration = 2000;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  open(mensaje: string): void {
    this.snackBar.open(mensaje, this.action, { duration: this.duration });
  }
}
