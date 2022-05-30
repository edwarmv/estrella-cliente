import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovimientoCaja } from '@models/movimiento-caja.model';
import { MovimientoCajaService } from '@services/movimiento-caja.service';
import { MessageDialogService } from '@shared/message-dialog/message-dialog.service';
import { Column } from '@shared/table/column.interface';
import {
  ServerDataSourceCB,
  ServerDataSourceCBRes,
} from '@shared/table/server.data-source';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movimientos-cajas',
  templateUrl: './movimientos-cajas.component.html',
  styleUrls: ['./movimientos-cajas.component.scss'],
})
export class MovimientosCajasComponent implements OnInit {
  movimientosCajasCB: ServerDataSourceCB<MovimientoCaja>;
  tableColumns: Column[] = [
    { name: 'No.', type: 'index' },
    { name: 'Caja', type: 'customColumn' },
    { name: 'Fecha y hora', type: 'customColumn' },
    { name: 'Tipo', type: 'customColumn' },
    { name: 'E. anterior', type: 'customColumn' },
    { name: 'E. cantidad', type: 'customColumn' },
    { name: 'E. actual', type: 'customColumn' },
    { name: 'Usuario', type: 'customColumn' },
    { name: 'Motivo', type: 'customColumn' },
  ];

  @ViewChild('cajaColumn', { static: true })
  cajaColumn: TemplateRef<any>;

  @ViewChild('fechaHoraColumn', { static: true })
  fechaHoraColumn: TemplateRef<any>;

  @ViewChild('tipoColumn', { static: true })
  tipoColumn: TemplateRef<any>;

  @ViewChild('estadoAnteriorColumn', { static: true })
  estadoAnteriorColumn: TemplateRef<any>;

  @ViewChild('cantidadColumn', { static: true })
  cantidadColumn: TemplateRef<any>;

  @ViewChild('estadoActualColumn', { static: true })
  estadoActualColumn: TemplateRef<any>;

  @ViewChild('usuarioColumn', { static: true })
  usuarioColumn: TemplateRef<any>;

  @ViewChild('motivoColumn', { static: true })
  motivoColumn: TemplateRef<any>;

  dateFilterForm: FormGroup;

  constructor(
    private movimientoCajaServie: MovimientoCajaService,
    private messageDialogService: MessageDialogService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.tableColumns[1].template = this.cajaColumn;
    this.tableColumns[2].template = this.fechaHoraColumn;
    this.tableColumns[3].template = this.tipoColumn;
    this.tableColumns[4].template = this.estadoAnteriorColumn;
    this.tableColumns[5].template = this.cantidadColumn;
    this.tableColumns[6].template = this.estadoActualColumn;
    this.tableColumns[7].template = this.usuarioColumn;
    this.tableColumns[8].template = this.motivoColumn;

    this.dateFilterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });

    combineLatest([
      this.dateFilterForm.get('startDate').valueChanges,
      this.dateFilterForm.get('endDate').valueChanges,
    ]).subscribe(value => {
      if (value[0] && value[1]) {
        this.obtenerMovimientosCajasCB(value[0], value[1]);
      }
      if (!value[0] && !value[1]) {
        this.obtenerMovimientosCajasCB();
      }
    });

    this.obtenerMovimientosCajasCB();
  }

  obtenerMovimientosCajasCB(
    startDate: Date | '' = '',
    endDate: Date | '' = ''
  ): void {
    this.movimientosCajasCB = ({ skip, take }) =>
      this.movimientoCajaServie
        .obtenerMovimientosCajas({ skip, take, startDate, endDate })
        .pipe(
          map(
            (resp): ServerDataSourceCBRes<MovimientoCaja> => ({
              rows: resp.values.map(value => ({ values: value })),
              total: resp.total,
            })
          )
        );
  }

  openMotivoDialog(movimientoCaja: MovimientoCaja) {
    this.messageDialogService.openDialog({
      title: 'Motivo',
      message: movimientoCaja.motivoMovimiento,
    });
  }
}
