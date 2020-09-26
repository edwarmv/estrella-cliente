import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '@models/rol.model';

@Component({
  selector: 'app-descripcion-rol',
  templateUrl: './descripcion-rol.component.html',
  styleUrls: ['./descripcion-rol.component.scss']
})
export class DescripcionRolComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DescripcionRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rol
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
