import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

type RolData = { nombre: string, descripcion: string };

@Component({
  selector: 'app-descripcion-dialog',
  templateUrl: './descripcion-dialog.component.html',
  styleUrls: ['./descripcion-dialog.component.scss']
})
export class DescripcionDialogComponent implements OnInit {
  title: string;

  descripcion: string;

  constructor(
    private dialogRef: MatDialogRef<DescripcionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: RolData
  ) { }

  ngOnInit(): void {
    this.title = this.data.nombre;

    this.descripcion = this.data.descripcion;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
