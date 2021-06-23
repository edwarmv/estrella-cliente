import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Cliente } from '@models/cliente.model';
import { ClienteService } from '@services/cliente.service';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB, ServerDataSourceCBRes } from '@shared/table/server.data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {
  clientesCB: ServerDataSourceCB<Cliente>;
  tableColumns: Column[] = [
    { name: 'No.',       type: 'index',        },
    { name: 'Nombre',    type: 'customColumn', },
    { name: 'NIT/CI',    type: 'customColumn', },
    { name: 'Modificar', type: 'customColumn', },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('nitCIColumn', { static: true })
  nitCIColumn: TemplateRef<any>;

  @ViewChild('modificarColumn', { static: true })
  modificarColumn: TemplateRef<any>;

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.nitCIColumn;
    this.tableColumns[3].template = this.modificarColumn;

    this.clientesCB = this.obtenerClientesCB();
  }

  obtenerClientesCB(): ServerDataSourceCB<Cliente> {
    return ({ skip, take, termino }) => {
      return this.clienteService.obtenerClientes(skip, take, termino)
      .pipe(
        map((res): ServerDataSourceCBRes<Cliente> => ({
          rows: res.clientes.map(cliente => ({ values: cliente })),
          total: res.total
        }))
      );
    };
  }
}
