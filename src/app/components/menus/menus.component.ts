import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageDialogService } from '@components/message-dialog/message-dialog.service';
import { Menu } from '@models/menu.model';
import { MenuService } from '@services/menu.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  map,
  takeUntil,
  take as takeRxJS,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit, OnDestroy {
  menus$: Observable<Menu[]>;
  buscadorForm: FormGroup;
  totalMenus: number;
  pageIndex = 0;
  pageSize = 5;
  displayedColumns: string [] = [
    'posicion',
    'nombre',
    'modificar',
    'eliminar'
  ];
  @ViewChild('paginator') paginator: MatPaginator;
  private unsubscribe = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private messageDialogService: MessageDialogService,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.menus$ = this.obtenerMenus(0, this.pageSize);

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      tap(() => {
        this.paginator.firstPage();
        this.menus$ = this.obtenerMenus(0, this.pageSize);
      })
    )
    .subscribe();
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.menus$ = this.obtenerMenus(skip, take);
  }

  obtenerMenus(skip: number, take: number): Observable<Menu[]> {
    const termino = this.termino.value;

    return this.menuService.obtenerMenus(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalMenus = resp.total;
        return resp.menus;
      })
    );
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
    .subscribe(result => {
      if (result.isConfirmed) {
        this.menuService.borrar(menu.id)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.paginator.firstPage();
          this.menus$ = this.obtenerMenus(0, this.pageSize);
          this.snackBar.open(resp.mensaje, 'Aceptar', {
            duration: 2000,
          });
        });
      }
    });
  }

  limpiarBusqueda(): void{
    this.termino.setValue('');
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
