import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageDialogService } from '@components/message-dialog/message-dialog.service';
import { Submenu } from '@models/submenu.model';
import { SubmenuService } from '@services/submenu.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap, take as takeRxJS } from 'rxjs/operators';

@Component({
  selector: 'app-submenus',
  templateUrl: './submenus.component.html',
  styleUrls: ['./submenus.component.scss']
})
export class SubmenusComponent implements OnInit, OnDestroy {
  submenus$: Observable<Submenu[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  totalSubmenus: number;
  pageIndex = 0;
  pageSize = 5;
  displayedColumns: string [] = [
    'posicion',
    'nombre',
    'modificar',
    'eliminar',
  ];
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private submenuService: SubmenuService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private messageDialogService: MessageDialogService,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.submenus$ = this.obtenerSubmenus(0, this.pageSize);

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      tap(() => {
        this.paginator.firstPage();
        this.submenus$ = this.obtenerSubmenus(0, this.pageSize);
      })
    )
    .subscribe();
  }

  obtenerSubmenus(skip: number, take: number): Observable<Submenu[]> {
    const termino = this.termino.value;

    return this.submenuService.obtenerSubmenus(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalSubmenus = resp.total;
        return resp.submenus;
      })
    );
  }

  borrarSubmenu(submenu: Submenu): void {
    this.messageDialogService.openDialog({
      title: `Eliminar submenú`,
      message: `¿Desea eliminar el submenú ${submenu.nombre}?`,
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
        this.submenuService.borrar(submenu.id)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.paginator.firstPage();
          this.submenus$ = this.obtenerSubmenus(0, this.pageSize);
          this.snackBar.open(resp.mensaje, 'Aceptar', {
            duration: 2000,
          });
        });
      }
    });
  }

  updateTable(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.submenus$ = this.obtenerSubmenus(skip, take);
  }

  limpiarBusqueda(): void {
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
