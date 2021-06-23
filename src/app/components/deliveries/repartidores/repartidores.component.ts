import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB, ServerDataSourceCBRes } from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.component.html',
  styleUrls: ['./repartidores.component.scss'],
})
export class RepartidoresComponent implements OnInit {
  repartidoresCB: ServerDataSourceCB<Usuario>;
  tableColumns: Column[] = [
    {
      name: 'No.',
      type: 'index'
    },
    {
      name: 'Repartidor',
      type: 'customColumn',
    },
    {
      name: 'Ver Pedidos',
      type: 'customColumn',
      position: 'center',
    }
  ];

  @ViewChild('verPedidosColumn', { static: true })
  verPedidosColumn: TemplateRef<any>;

  @ViewChild('repartidorColumn', { static: true })
  repartidorColumn: TemplateRef<any>;

  pageIndex = 0;
  pageSize = 5;
  total: number;

  termino = '';

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.repartidorColumn;
    this.tableColumns[2].template = this.verPedidosColumn;

    this.repartidoresCB = this.obtenerRepartidoresCB();
  }

  obtenerRepartidoresCB(): ServerDataSourceCB<Usuario> {
    return ({ skip, take, termino }) => {
      return this.usuarioService.obtenerUsuarios({
        skip,
        take,
        termino,
        rol: 'repartidor'
      }).pipe(
        map((resp): ServerDataSourceCBRes<Usuario> => ({
          rows: resp.usuarios.map(usuario => ({ values: usuario })),
          total: resp.total,
        }))
      );
    };
  }
}
