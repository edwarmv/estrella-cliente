import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sucursal } from '@models/sucursal.model';

@Component({
  selector: 'app-mas-informacion-dialog',
  templateUrl: './mas-informacion-dialog.component.html',
  styleUrls: ['./mas-informacion-dialog.component.scss']
})
export class MasInformacionDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MasInformacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sucursal,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
