import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RolUsuario } from '@models/rol-usuario.model';
import { Rol } from '@models/rol.model';
import { Usuario } from '@models/usuario.model';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { UsuarioService } from '@services/usuario.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsignarRolComponent } from './asignar-rol/asignar-rol.component';

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
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params.id;
    if (this.idUsuario) {
      this.usuario$ = this.usuarioService.obtenerUsuario(this.idUsuario);
    }
  }

  asignarRol(): void {
    const dialogRef = this.dialog.open(AsignarRolComponent);

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe(rol => {
      if (rol) {
        const rolUsuario = {
          usuario: { id: this.idUsuario },
          rol
        } as RolUsuario;
        this.rolUsuarioService.asignarRolUsuario(rolUsuario)
        .pipe(take(1))
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
