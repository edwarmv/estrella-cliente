import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MessageDialogService
} from '@shared/message-dialog/message-dialog.service';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { map, take as takeRxJS } from 'rxjs/operators';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB, ServerDataSourceCBRes } from '@shared/table/server.data-source';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.scss']
})
export class ListaRolesComponent implements OnInit {
  rolesCB: ServerDataSourceCB<Rol>;
  tableColumns: Column[] = [
    { name: 'No.', type: 'index' },
    { name: 'Nombre', type: 'customColumn' },
    { name: 'Descripción', type: 'customColumn' },
    { name: 'modificar', type: 'customColumn' },
    { name: 'eliminar', type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('descripcionColumn', { static: true })
  descripcionColumn: TemplateRef<any>;

  @ViewChild('modificarColumn', { static: true })
  modificarColumn: TemplateRef<any>;

  @ViewChild('eliminarColumn', { static: true })
  eliminarColumn: TemplateRef<any>;

  constructor(
    private rolService: RolService,
    private messageDialogService: MessageDialogService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.descripcionColumn;
    this.tableColumns[3].template = this.modificarColumn;
    this.tableColumns[4].template = this.eliminarColumn;

    this.rolesCB = this.obtenerRolesCB();
  }

  verDescripcion(nombre: string, descripcion: string): void {
    this.messageDialogService.openDialog(
      {
        title: nombre,
        message: descripcion
      }
    );
  }

  obtenerRolesCB(): ServerDataSourceCB<Rol> {
    return ({ skip, take, termino }) => {
      return this.rolService.obtenerRoles(skip, take, termino)
      .pipe(
        map((resp): ServerDataSourceCBRes<Rol> => ({
          rows: resp.roles.map(rol => ({ values: rol })),
          total: resp.total,
        }))
      );
    };
  }

  eliminarRol(rol: Rol): void {
    this.messageDialogService.openDialog({
      title: `Eliminar rol`,
      message: `¿Desea eliminar el rol ${rol.nombre}?`,
      messageDialogConfig: {
        confirmButtonText: 'Si',
        confirmButtonColor: 'warn',
        showCancelButton: true,
      }
    })
    .afterClosed()
    .pipe(takeRxJS(1))
    .subscribe(res => {
      if (res) {
        this.rolService.eliminarRol(rol.id)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.rolesCB = this.obtenerRolesCB();
          this.snackBar.open(resp.mensaje, 'Aceptar', {
            duration: 2000,
          });
        });
      }
    });
  }
}
