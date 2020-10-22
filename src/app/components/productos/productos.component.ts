import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MessageDialogService } from '@components/message-dialog/message-dialog.service';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@services/producto.service';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import {
  DetallesProductoDialogComponent
} from './detalles-producto-dialog/detalles-producto-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos$: Observable<Producto[]>;
  buscadorForm: FormGroup;
  totalProductos: number;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.productos$ = this.obtenerProductos(0, 12);

    this.buscadorForm.get('termino').valueChanges.pipe(
      debounceTime(500),
      switchMap(() => {
        this.paginator.firstPage();
        console.log('obtener productos');

        return this.productos$ = this.obtenerProductos(0, 12);
      })
    ).subscribe();
  }

  obtenerProductos(skip: number, take: number): Observable<Producto[]> {
    const termino = this.termino.value;

    return this.productoService.obtenerProductos(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalProductos = resp.total;
        return resp.productos;
      })
    );
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.productos$ = this.obtenerProductos(skip, take);
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  verDetalles(producto: Producto): void {
    this.dialog.open(
      DetallesProductoDialogComponent,
      { data: producto }
    );
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
