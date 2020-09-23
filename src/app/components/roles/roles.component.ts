import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DescripcionDialogComponent } from './descripcion-dialog/descripcion-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles$: Observable<Rol[]>;

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

  termino = '';

  constructor(
    private rolService: RolService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.roles$ = this.obtenerRoles(this.pageIndex, this.pageSize);
  }

  verDescripcion(nombre: string, descripcion: string): void {
    this.dialog.open(
      DescripcionDialogComponent,
      {
        data: { nombre, descripcion }
      }
    );
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    if (this.termino) {
      this.roles$ = this.obtenerRoles(skip, take, this.termino);
    } else {
      this.roles$ = this.obtenerRoles(skip, take);
    }
  }

  obtenerRoles(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<Rol[]> {
    return this.rolService.obtenerRoles(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalRoles = resp.total;
        return resp.roles;
      })
    );
  }

  buscar(): void {
    this.roles$ = this.obtenerRoles(0, this.pageSize, this.termino);
  }

  limpiarBusqueda(): void {
    this.termino = '';
    this.roles$ = this.obtenerRoles(0, this.pageSize);
  }

  eliminarRol(id: number, nombre: string): void {
    Swal.fire({
      title: `Eliminar rol: ${nombre}`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#f44336',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster'
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.rolService.eliminarRol(id).subscribe(resp => {
          this.roles$ = this.obtenerRoles(0, this.pageSize);
          Swal.fire(resp.mensaje);
        });
      }
    });
  }
}
