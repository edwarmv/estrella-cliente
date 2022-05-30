import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CategoriaProducto } from '@models/categoria-producto.model';
import { Producto } from '@models/producto.model';
import { CategoriaProductoService } from '@services/categoria-producto.service';
import { ProductoService } from '@services/producto.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { DetallesProductoDialogComponent } from '../detalles-producto-dialog/detalles-producto-dialog.component';

type EstadoProducto = {
  name: string;
  value: 'true' | 'false' | '';
};

@Component({
  selector: 'app-productos-view',
  templateUrl: './productos-view.component.html',
  styleUrls: ['./productos-view.component.scss'],
})
export class ProductosViewComponent implements OnInit {
  // filtros
  showActionsFilter = false;
  categoriasProductosFilter: CategoriaProducto[] = [];
  estadosProducto: EstadoProducto[] = [
    { name: 'Activos', value: 'true' },
    { name: 'No activos', value: 'false' },
    { name: 'Ambos', value: '' },
  ];
  estadoProductoSeleccionado: EstadoProducto = this.estadosProducto[0];

  productos$: Observable<Producto[]>;
  private unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  // paginacion
  totalProductos: number;
  skip = 0;
  take = 12;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private selectionListDialogService: SelectionListDialogService,
    private categoriaProductoService: CategoriaProductoService
  ) {}

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: [''],
    });

    this.obtenerProductos();

    this.termino.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe(() => {
        this.paginator.firstPage();
        return this.obtenerProductos();
      });
  }

  obtenerProductos(): void {
    console.log(this.estadoProductoSeleccionado);
    this.productos$ = this.productoService
      .obtenerProductos({
        skip: this.skip,
        take: this.take,
        termino: this.termino.value,
        categoriasProductos: this.categoriasProductosFilter,
        estadoProducto: this.estadoProductoSeleccionado.value,
      })
      .pipe(
        map(resp => {
          this.totalProductos = resp.total;
          return resp.productos;
        })
      );
  }

  updateTable(pageEvent: PageEvent): void {
    this.take = pageEvent.pageSize;
    this.skip = pageEvent.pageIndex * this.take;

    this.obtenerProductos();
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  verDetalles(producto: Producto): void {
    this.dialog.open(DetallesProductoDialogComponent, { data: producto });
  }

  seleccionarFiltroCategoriaProducto(): void {
    this.selectionListDialogService
      .open<CategoriaProducto>({
        title: 'Seleccionar categoria',
        search: {
          placeholder: 'Nombre categoria',
        },
        cb: (skip, take, termino) =>
          this.categoriaProductoService
            .obtenerCategoriasProductos({ skip, take, termino })
            .pipe(
              map(resp => ({
                values: resp.categoriasProductos.map(categoriaProducto => ({
                  label: `${categoriaProducto.nombre}`,
                  value: categoriaProducto,
                })),
                total: resp.total,
              }))
            ),
      })
      .subscribe(categoriaProducto => {
        if (categoriaProducto) {
          if (
            !!!this.categoriasProductosFilter.some(
              _categoriaProducto =>
                _categoriaProducto.id === categoriaProducto.id
            )
          ) {
            this.categoriasProductosFilter.push(categoriaProducto);
            this.obtenerProductos();
          }
        }
      });
  }

  removeCategoriasProductosFilter(categoriaProducto: CategoriaProducto): void {
    const index = this.categoriasProductosFilter.findIndex(
      categoriaProductoFilter =>
        categoriaProductoFilter.nombre === categoriaProducto.nombre
    );
    if (index >= 0) {
      this.categoriasProductosFilter.splice(index, 1);
      this.obtenerProductos();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
