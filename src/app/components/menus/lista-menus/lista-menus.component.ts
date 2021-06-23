import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageDialogService } from '@shared/message-dialog/message-dialog.service';
import { Menu } from '@models/menu.model';
import { MenuService } from '@services/menu.service';
import { map, take as takeRxJS } from 'rxjs/operators';
import { Row } from '@shared/table/row.interface';
import { Column } from '@shared/table/column.interface';
import { ServerDataSourceCB, ServerDataSourceCBRes } from '@shared/table/server.data-source';

@Component({
  selector: 'app-lista-menus',
  templateUrl: './lista-menus.component.html',
  styleUrls: ['./lista-menus.component.scss']
})
export class ListaMenusComponent implements OnInit {
  menusCB: ServerDataSourceCB<Menu>;
  tableColumns: Column[] = [
    { name: 'No.',       type: 'index'        },
    { name: 'Nombre',    type: 'customColumn' },
    { name: 'Modificar', type: 'customColumn' },
    { name: 'Eliminar',  type: 'customColumn' },
  ];

  @ViewChild('nombreColumn', { static: true })
  nombreColumn: TemplateRef<any>;

  @ViewChild('modificarColumn', { static: true })
  modificarColumn: TemplateRef<any>;

  @ViewChild('eliminarColumn', { static: true })
  eliminarColumn: TemplateRef<any>;

  constructor(
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private messageDialogService: MessageDialogService,
  ) { }

  ngOnInit(): void {
    this.tableColumns[1].template = this.nombreColumn;
    this.tableColumns[2].template = this.modificarColumn;
    this.tableColumns[3].template = this.eliminarColumn;
    this.menusCB = this.obtenerMenusCB();
  }

  obtenerMenusCB(): ServerDataSourceCB<Menu> {
    return ({ skip, take, termino }) => {
      return this.menuService.obtenerMenus(skip, take, termino)
      .pipe(
        map((resp): ServerDataSourceCBRes<Menu> => ({
          rows: resp.menus.map((menu): Row<Menu> => ({ values: menu })),
          total: resp.total,
        }))
      );
    };
  }

  borrarMenu(menu: Menu): void {
    this.messageDialogService.openDialog({
      title: `Eliminar menú`,
      message: `¿Desea eliminar el menú ${menu.nombre}?`,
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
        this.menuService.borrar(menu.id)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.menusCB = this.obtenerMenusCB();
          this.snackBar.open(resp.mensaje, 'Aceptar', {
            duration: 2000,
          });
        });
      }
    });
  }
}
