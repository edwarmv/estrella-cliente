import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from '@models/producto.model';

@Component({
  selector: 'app-detalles-producto-dialog',
  templateUrl: './detalles-producto-dialog.component.html',
  styleUrls: ['./detalles-producto-dialog.component.scss']
})
export class DetallesProductoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetallesProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editarInformacion(): void {
    this.onNoClick();
    this.router.navigate(['productos', this.producto.id]);
  }

}
