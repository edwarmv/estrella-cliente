import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Caja } from '@models/caja.model';
import { CajaService } from '@services/caja.service';
import { Column } from '@shared/table/column.interface';
import {
  ServerDataSourceCB,
  ServerDataSourceCBRes,
} from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-cajas',
  templateUrl: './lista-cajas.component.html',
  styleUrls: ['./lista-cajas.component.scss'],
})
export class ListaCajasComponent implements OnInit {
  cajasCB: ServerDataSourceCB<Caja>;
  tableColumns: Column[] = [
    { name: 'No.', type: 'index' },
    { name: 'Nombre', type: 'customColumn' },
    { name: 'Sucursal', type: 'customColumn' },
    { name: 'Estado', type: 'customColumn' },
    { name: 'Editar', type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('sucursalColumn', { static: true })
  sucursalColumn: TemplateRef<any>;

  @ViewChild('estadoColumn', { static: true })
  estadoColumn: TemplateRef<any>;

  @ViewChild('editarColumn', { static: true })
  editarColumn: TemplateRef<any>;

  constructor(private cajaService: CajaService) {}

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.sucursalColumn;
    this.tableColumns[3].template = this.estadoColumn;
    this.tableColumns[4].template = this.editarColumn;

    this.setCajasCB();
  }

  setCajasCB(): void {
    this.cajasCB = ({ take, skip, termino }) =>
      this.cajaService
        .obtenerCajas({
          take,
          skip,
          termino,
        })
        .pipe(
          map(
            (res): ServerDataSourceCBRes<Caja> => ({
              rows: res.values.map(caja => ({ values: caja })),
              total: res.total,
            })
          )
        );
  }
}
