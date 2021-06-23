import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RolUsuario } from '@models/rol-usuario.model';
import { Rol } from '@models/rol.model';
import { Usuario } from '@models/usuario.model';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { RolService } from '@services/rol.service';
import { UsuarioService } from '@services/usuario.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { Observable, Subscription } from 'rxjs';
import { map, take as takeRxJS } from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.scss']
})
export class RolesUsuarioComponent implements OnInit, OnDestroy {
  usuario$: Observable<Usuario>;
  idUsuario: number;
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private rolUsuarioService: RolUsuarioService,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private selectionListDialogService: SelectionListDialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params.id;
    if (this.idUsuario) {
      this.usuario$ = this.usuarioService.obtenerUsuario(this.idUsuario);
    }
  }

  asignarRol(): void {
    this.selectionListDialogService.open<Rol>({
      title: 'Selecciona un rol',
      search: { placeholder: 'Nombre del rol' },
      cb: (skip, take, termino) => {
        return this.rolService.obtenerRoles(skip, take, termino)
        .pipe(
          map(resp => {
            const roles = resp.roles.map(rol => {
              return {
                label: rol.nombre,
                value: rol,
              };
            });

            return {
              total: resp.total,
              values: roles
            };
          })
        );
      }
    }).subscribe(rol => {
      if (rol) {
        const rolUsuario = {
          usuario: { id: this.idUsuario },
          rol
        } as RolUsuario;
        this.rolUsuarioService.asignarRolUsuario(rolUsuario)
        .pipe(takeRxJS(1))
        .subscribe(resp => {
          this.usuario$ = this.usuarioService.obtenerUsuario(this.idUsuario);
          this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
        });
      }
    });
  }

  borrarRolUsuario(idRol: number): void {
    this.rolUsuarioService.borrarRolUsuario(idRol, this.idUsuario)
    .subscribe(resp => {
      this.usuario$ = this.usuarioService.obtenerUsuario(this.idUsuario);
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }

  displayFn(rol: Rol): string {
    return rol && rol.nombre ? rol.nombre : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
