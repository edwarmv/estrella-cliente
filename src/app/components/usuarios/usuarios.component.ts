import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';
import { Usuario } from '@models/usuario.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, take as takeRxJS, takeUntil } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'posicion',
    'nombre',
    'apellido',
    'nitCI',
    'email',
    'roles',
    'masInformacion',
    'estado',
  ];
  totalUsuarios: number;
  pageIndex = 0;
  pageSize = 5;
  usuarios$: Observable<Usuario[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.usuarios$ = this.obtenerUsuarios(0, this.pageSize);

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
    )
    .subscribe(() => {
      this.paginator.firstPage();
      this.usuarios$ = this.obtenerUsuarios(0, this.pageSize);
    });
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.usuarios$ = this.obtenerUsuarios(skip, take);
  }

  obtenerUsuarios(skip: number, take: number): Observable<Usuario[]> {
    const termino = this.termino.value;
    return this.usuarioService.obtenerUsuarios(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalUsuarios = resp.total;
        return resp.usuarios;
      })
    );
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  cambiarEstado(usuario: Usuario): void {
    this.usuarioService.cambiarEstado(usuario.id)
    .pipe(takeRxJS(1))
    .subscribe(resp => {
      this.usuarios$ = this.obtenerUsuarios(
        this.paginator.pageSize * this.paginator.pageIndex, this.pageSize
      );
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
