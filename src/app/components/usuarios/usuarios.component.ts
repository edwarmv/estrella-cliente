import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';
import { Usuario } from '@models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'posicion',
    'nombres',
    'apellidos',
    'nitCI',
    'masInformacion',
    'eliminar',
  ];
  totalUsuarios: number;
  pageIndex = 0;
  pageSize = 5;
  usuarios$: Observable<Usuario[]>;

  buscadorForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuarios$ = this.obtenerUsuarios(0, 5);

    this.buscadorForm = this.fb.group({
      termino: ['', Validators.required]
    });
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    const termino = this.buscadorForm.get('termino').value;
    if (termino) {
      this.usuarios$ = this.obtenerUsuarios(skip, take, termino);
    } else {
      this.usuarios$ = this.obtenerUsuarios(skip, take);
    }
  }

  obtenerUsuarios(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<Usuario[]> {
    return this.usuarioService.obtenerUsuarios(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalUsuarios = resp.total;
        return resp.usuarios;
      })
    );
  }

  buscar(): void {
    const termino = this.buscadorForm.get('termino').value;
    this.usuarios$ = this.obtenerUsuarios(0, this.pageSize, termino);
  }

  eliminarUsuario(id: number, nombreCompleto: string): void {
    Swal.fire({
      title: `Eliminar usuario: ${nombreCompleto}`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#f44336'
    }).then(result => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe(resp => {
          this.usuarios$ = this.obtenerUsuarios(0, this.pageSize);
          Swal.fire(resp.mensaje);
        });
      }
    });
  }
}
