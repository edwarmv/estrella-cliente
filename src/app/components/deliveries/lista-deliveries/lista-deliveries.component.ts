import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { Usuario } from '@models/usuario.model';
import { PedidoService } from '@services/pedido.service';
import { UsuarioService } from '@services/usuario.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB, ServerDataSourceCBRes } from '@shared/table/server.data-source';
import { map, take as takeRxJS } from 'rxjs/operators';

@Component({
  selector: 'app-lista-deliveries',
  templateUrl: './lista-deliveries.component.html',
  styleUrls: ['./lista-deliveries.component.scss']
})
export class ListaDeliveriesComponent implements OnInit {
  pedidosCB: ServerDataSourceCB<Pedido>;
  tableColumns: Column[] = [
    {
      name: 'No.',
      type: 'index'
    },
    {
      name: 'Cliente',
      type: 'customColumn'
    },
    {
      name: 'Fecha de entrega',
      type: 'customColumn'
    },
    {
      name: 'Detalle pedido',
      type: 'customColumn'
    },
    {
      name: 'Repartidor',
      type: 'customColumn'
    },
    {
      name: 'Asignar repartidor',
      type: 'customColumn'
    }
  ];

  @ViewChild('clienteColumn', { static: true })
  clienteColumn: TemplateRef<any>;

  @ViewChild('fechaEntregaColumn', { static: true })
  fechaEntregaColumn: TemplateRef<any>;

  @ViewChild('detallePedidoColumn', { static: true })
  detallePedidoColumn: TemplateRef<any>;

  @ViewChild('repartidorColumn', { static: true })
  repartidorColumn: TemplateRef<any>;

  @ViewChild('asignarRepartidorColumn', { static: true })
  asignarRepartidorColumn: TemplateRef<any>;

  termino: string;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private selectionListDialogService: SelectionListDialogService,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.clienteColumn;
    this.tableColumns[2].template = this.fechaEntregaColumn;
    this.tableColumns[3].template = this.detallePedidoColumn;
    this.tableColumns[4].template = this.repartidorColumn;
    this.tableColumns[5].template = this.asignarRepartidorColumn;

    this.pedidosCB = this.obtenerPedidosCB();
  }

  asignarRepartidor(idPedido: number): void {
    this.selectionListDialogService.open<Usuario>({
      title: 'Asignar Pedido',
      search: {
        placeholder: 'Nombre/Apellido/NIT/CI'
      },
      cb: (skip, take, termino) => {
        return this.usuarioService.obtenerUsuarios({
          skip,
          take,
          termino,
          rol: 'repartidor'
        }).pipe(
          map(resp => {
            const values = resp.usuarios.map(usuario => {
              return {
                label: `${usuario.nombre} ${usuario.apellido}`,
                value: usuario
              };
            });

            return {
              values,
              total: resp.total
            };
          })
        );
      }
    })
    .pipe(takeRxJS(1))
    .subscribe(usuario => {
      if (usuario) {
        this.pedidoService.asignarRepartidor(idPedido, usuario.id)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.pedidosCB = this.obtenerPedidosCB();
          this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
        });
      }
    });
  }

  obtenerPedidosCB(): ServerDataSourceCB<Pedido> {
    return ({ take, skip, termino }) => {
      return this.pedidoService.obtenerPedidos({
        skip,
        take,
        termino,
        estado: EstadoPedido.LISTO,
        conServicioEntrega: 1,
        repartidorAsignado: ''
      }).pipe(
        map((res): ServerDataSourceCBRes<Pedido> => ({
          rows: res.pedidos.map(pedido => ({ values: pedido })),
          total: res.total,
        }))
      );
    };
  }
}
