import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaProductoService } from '@services/categoria-producto.service';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto-dialog.component.html',
  styleUrls: ['./categoria-producto-dialog.component.scss'],
})
export class CategoriaProductoComponentDialog implements OnInit {
  title = 'Nueva categoria';
  categoriaProductoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaProductoComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { idCategoriaProducto: number },
    private categoriaProductoService: CategoriaProductoService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.categoriaProductoForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
    });

    if (this.data && this.data.idCategoriaProducto) {
      this.categoriaProductoService
        .obtenerCategoriaPrdoucto(this.data.idCategoriaProducto)
        .subscribe((categoriaProducto) => {
          this.categoriaProductoForm.setValue(categoriaProducto);
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  crearCategoriaProducto(): void {
    if (this.categoriaProductoForm.valid) {
      this.categoriaProductoService
        .crear(this.categoriaProductoForm.value)
        .subscribe((resp) => {
          this.dialogRef.close(true);
          this.snackBarService.open(resp.mensaje);
        });
    }
  }

  actualizarCategoriaProducto(): void {
    if (this.categoriaProductoForm.valid) {
      this.categoriaProductoService
        .actualizarCategoriaProducto(this.categoriaProductoForm.value)
        .subscribe((resp) => {
          this.dialogRef.close(true);
          this.snackBarService.open(resp.mensaje);
        });
    }
  }

  get nombre(): AbstractControl {
    return this.categoriaProductoForm.get('nombre');
  }
}
