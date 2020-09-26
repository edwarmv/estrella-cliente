import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rol } from '@models/rol.model';
import { Usuario } from '@models/usuario.model';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { RolService } from '@services/rol.service';
import { UsuarioService } from '@services/usuario.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  roles$: Observable<Rol[]>;

  usuario$: Observable<Usuario>;

  rolSeleccionado = new FormControl();

  mensaje: string;

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private rolUsuarioService: RolUsuarioService,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.usuario$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const idUsuario = Number.parseInt(params.get('id'), 10);
        return this.usuarioService.obtenerUsuario(idUsuario);
      })
    );

    this.roles$ = this.rolSeleccionado.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        return this.rolService.obtenerRoles(0, 0, value)
        .pipe(map(resp => resp.roles));
      })
    );
  }

  asignarRol(idUsuario: number): void {
    const rol = this.rolSeleccionado.value;
    if (!rol) {
      this.mensaje = 'Campo vacio';
    } else {
      this.rolUsuarioService.asignarRolUsuario(rol.id, idUsuario)
      .subscribe(resp => {
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });

        this.rolSeleccionado.reset();

        this.usuario$ = this.usuarioService.obtenerUsuario(idUsuario);
      }, error => {
        this.mensaje = error.error.mensaje;
      });
    }
  }

  borrarRolUsuario(idRol: number, idUsuario: number): void {
    this.rolUsuarioService.borrarRolUsuario(idRol, idUsuario)
    .subscribe(resp => {
      this.usuario$ = this.usuarioService.obtenerUsuario(idUsuario);
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
