import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MessageDialogService
} from '@components/message-dialog/message-dialog.service';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, take as takeRxJS, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  roles$: Observable<Rol[]>;
  private unsubscribe = new Subject<void>();

  displayedColumns: string[] = [
    'posicion',
    'nombre',
    'descripcion',
    'modificar',
    'eliminar',
  ];
  totalRoles: number;
  pageIndex = 0;
  pageSize = 5;
  @ViewChild('paginator') paginator: MatPaginator;

  buscadorForm: FormGroup;

  constructor(
    private rolService: RolService,
    private fb: FormBuilder,
    private messageDialogService: MessageDialogService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.roles$ = this.obtenerRoles(this.pageIndex, this.pageSize);

    this.termino.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      map(() => {
        this.paginator.firstPage();
        this.roles$ = this.obtenerRoles(this.pageIndex, this.pageSize);
      })
    ).subscribe();

  }

  verDescripcion(nombre: string, descripcion: string): void {
    this.messageDialogService.openDialog(
      {
        title: nombre,
        message: descripcion
      }
    );
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.roles$ = this.obtenerRoles(skip, take);
  }

  obtenerRoles(
    skip: number,
    take: number
  ): Observable<Rol[]> {
    const termino = this.termino.value;

    return this.rolService.obtenerRoles(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalRoles = resp.total;
        return resp.roles;
      })
    );
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
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
    .subscribe(result => {
      if (result.isConfirmed) {
        this.rolService.eliminarRol(rol.id)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.paginator.firstPage();
          this.roles$ = this.obtenerRoles(0, this.pageSize);
          this.snackBar.open(resp.mensaje, 'Aceptar', {
            duration: 2000,
          });
        });
      }
    });
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
