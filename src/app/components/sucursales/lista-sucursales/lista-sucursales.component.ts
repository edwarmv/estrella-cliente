import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sucursal } from '@models/sucursal.model';
import { SucursalService } from '@services/sucursal.service';
import { Column } from '@shared/table/column.interface';
import {
  ServerDataSourceCB,
  ServerDataSourceCBRes,
} from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';
import { MasInformacionDialogComponent } from './mas-informacion-dialog/mas-informacion-dialog.component';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.scss']
})
export class ListaSucursalesComponent implements OnInit {
  sucursalesCB: ServerDataSourceCB<Sucursal>;
  tableColumns: Column[] = [
    { name: 'No.',          type: 'index'        },
    { name: 'Nombre',       type: 'customColumn' },
    { name: 'Más detalles', type: 'customColumn' },
    { name: 'Estado',       type: 'customColumn' },
    { name: 'Editar',       type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('masDetallesColumn', { static: true })
  masDetallesColumn: TemplateRef<any>;

  @ViewChild('estadoColumn', { static: true })
  estadoColumn: TemplateRef<any>;

  @ViewChild('editarColumn', { static: true })
  editarColumn: TemplateRef<any>;

  constructor(
    private sucursalService: SucursalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.masDetallesColumn;
    this.tableColumns[3].template = this.estadoColumn;
    this.tableColumns[4].template = this.editarColumn;

    this.setSucursalesCB();
  }

  setSucursalesCB(): void {
    this.sucursalesCB = ({ take, skip, termino }) =>
      this.sucursalService
        .obtenerSucursales({
          skip,
          take,
          termino,
        })
        .pipe(
          map(
            (res): ServerDataSourceCBRes<Sucursal> => ({
              rows: res.values.map(pedido => ({ values: pedido })),
              total: res.total,
            })
          )
        );
  }

  abrirMasInformacionDialog(sucursal: Sucursal): void {
    this.dialog.open(MasInformacionDialogComponent, {
      data: sucursal,
    });
  }
}
