import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@services/producto.service';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  buscador: FormGroup;
  productos$: Observable<Producto[]>;

  constructor(
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    private fb: FormBuilder,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.buscador = this.fb.group({
      termino: ['']
    });

    this.productos$ = this.termino.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(termino => {
        return this.productoService
        .obtenerProductos(0, 0, termino)
        .pipe(
          map(resp => resp.productos)
        );
      })
    );
  }

  agregarProducto(producto: Producto): void {
    this.dialogRef.close(producto);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get termino(): AbstractControl {
    return this.buscador.get('termino');
  }
}
