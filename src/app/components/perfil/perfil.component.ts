import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@models/usuario.model';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DescripcionRolComponent } from './descripcion-rol/descripcion-rol.component';
import { Rol } from '@models/rol.model';
import { RolUsuario } from '@models/rol-usuario.model';
import { RolUsuarioService } from '@services/rol-usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, OnDestroy {
  perfilForm: FormGroup;
  correoElectronicoForm: FormGroup;

  subscription: Subscription = new Subscription();

  usuario$: Observable<Usuario>;

  rolesUsuario$: Observable<RolUsuario[]>;

  keyName: string;

  constructor(
    public usuarioService: UsuarioService,
    private rolUsuarioService: RolUsuarioService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ '', Validators.required ],
      apellido: [ '', Validators.required ],
      nitCI: [ '' ],
      telefonoFijo: [ '' ],
      telefonoMovil: [ '' ],
      direccionDomicilio: [ '' ]
    });

    this.correoElectronicoForm = this.fb.group({
      correoElectronico: [ '' ]
    });

    this.keyName = 'foto-usuario';

    this.usuario$ = this.usuarioService.usuario
    .pipe(
      tap(usuario => {
        if (usuario) {
          this.perfilForm.patchValue(usuario);
          this.correoElectronicoForm.patchValue(usuario);
        }
      })
    );

    this.rolesUsuario$ = this.rolUsuarioService.rolesUsuario;
  }

  actualizarUsuario(id: number): void {
    this.subscription = this.usuarioService
    .actualizarUsuario(this.perfilForm.value, id)
    .subscribe(() => {
      this.usuarioService.usuarioSubject.next(undefined);
    });

  }

  mostrarDescripcionRol(rol: Rol): void {
    this.dialog.open(DescripcionRolComponent, { data: rol });
  }

  actualizarUsuarioConectado(): void {
    this.usuarioService.usuarioSubject.next(undefined);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  uploadUrl(id: number): string {
    return `${environment.apiURL}/foto-usuario/${id}`;
  }
}
