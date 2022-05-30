import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaProducto } from '@models/categoria-producto.model';
import { CategoriaProductoService } from '@services/categoria-producto.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Column } from '@shared/table/column.interface';
import {
  ServerDataSourceCB,
  ServerDataSourceCBRes,
} from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';
import { CategoriaProductoComponentDialog } from './categoria-producto-dialog/categoria-producto-dialog.component';

@Component({
  selector: 'app-categorias-productos',
  templateUrl: './categorias-productos.component.html',
  styleUrls: ['./categorias-productos.component.scss'],
})
export class CategoriasProductosComponent implements OnInit {
  categoriasProductosCB: ServerDataSourceCB<CategoriaProducto>;
  tableColumns: Column[] = [
    { name: 'No.', type: 'index' },
    { name: 'Nombre', type: 'customColumn' },
    { name: 'Editar', type: 'customColumn' },
    { name: 'Borrar', type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;
  @ViewChild('editarColumn', { static: true })
  editarColumn: TemplateRef<any>;
  @ViewChild('borrarColumn', { static: true })
  borrarColumn: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private categoriaProductoService: CategoriaProductoService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.editarColumn;
    this.tableColumns[3].template = this.borrarColumn;

    this.categoriasProductosCB = this.obtenerCategoriasProductosCB();
  }

  obtenerCategoriasProductosCB(): ServerDataSourceCB<CategoriaProducto> {
    return ({ take, skip, termino }) =>
      this.categoriaProductoService
        .obtenerCategoriasProductos({
          take,
          skip,
          termino,
        })
        .pipe(
          map(
            (res): ServerDataSourceCBRes<CategoriaProducto> => ({
              rows: res.categoriasProductos.map(categoriaProducto => ({
                values: categoriaProducto,
              })),
              total: res.total,
            })
          )
        );
  }

  openDialog(idCategoriaProducto?: number): void {
    const dialogRef = this.dialog.open(CategoriaProductoComponentDialog, {
      data: { idCategoriaProducto },
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.categoriasProductosCB = this.obtenerCategoriasProductosCB();
      }
    });
  }

  borrarCategoriaProducto(idCategoriaProducto: number): void {
    this.categoriaProductoService
      .borrar(idCategoriaProducto)
      .subscribe(resp => {
        this.categoriasProductosCB = this.obtenerCategoriasProductosCB();
        this.snackBarService.open(resp.mensaje);
      });
  }
}
