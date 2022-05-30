import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';
import { Usuario } from '@models/usuario.model';
import { map, take as takeRxJS } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB } from '@shared/table/server.data-source';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  usuariosCB: ServerDataSourceCB<Usuario>;
  tableColumns: Column[] = [
    { name: 'No.',                type: 'index'        },
    { name: 'Nombre',             type: 'customColumn' },
    { name: 'Correo electrónico', type: 'customColumn' },
    { name: 'Roles',              type: 'customColumn' },
    { name: 'Más información',    type: 'customColumn' },
    { name: 'Estado',             type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('emailColumn', { static: true })
  emailColumn: TemplateRef<any>;

  @ViewChild('rolesColumn', { static: true })
  rolesColumn: TemplateRef<any>;

  @ViewChild('masInformacionColumn', { static: true })
  masInformacionColumn: TemplateRef<any>;

  @ViewChild('estadoColumn', { static: true })
  estadoColumn: TemplateRef<any>;

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.emailColumn;
    this.tableColumns[3].template = this.rolesColumn;
    this.tableColumns[4].template = this.masInformacionColumn;
    this.tableColumns[5].template = this.estadoColumn;

    this.usuariosCB = this.obtenerUsuariosCB();
  }

  obtenerUsuariosCB(): ServerDataSourceCB<Usuario> {
    return ({ skip, take, termino }) => {
      return this.usuarioService.obtenerUsuarios({
        skip,
        take,
        termino,
      }).pipe(
        map(resp => ({
          rows: resp.usuarios.map(usuario => ({ values: usuario })),
          total: resp.total,
        }))
      );
    };
  }

  cambiarEstado(usuario: Usuario): void {
    this.usuarioService.cambiarEstado(usuario.id)
    .pipe(takeRxJS(1))
    .subscribe(resp => {
      this.usuariosCB = this.obtenerUsuariosCB();
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }
}
