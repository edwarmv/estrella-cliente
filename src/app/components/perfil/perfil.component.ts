import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '@services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@models/usuario.model';
import { Subscription, scheduled, queueScheduler, Observable } from 'rxjs';
import { concatAll, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  keyName: string;

  constructor(
    public usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombres: [ '', Validators.required ],
      apellidos: [ '', Validators.required ],
      nitCI: [ '' ],
      telefonoFijo: [ '' ],
      telefonoMovil: [ '' ],
      direccionDomicilio: [ '' ]
    });

    this.correoElectronicoForm = this.fb.group({
      correoElectronico: [ '' ]
    });

    this.keyName = 'foto-usuario';

    this.usuario$ = this.usuarioService.usuarioConectadoSubject
    .pipe(tap(usuario => {
      if (usuario) {
        this.perfilForm.patchValue(usuario);

        this.correoElectronicoForm.patchValue(usuario);
      }
    }));
    this.usuarioService.actualizarUsuarioConectado();
  }

  actualizarUsuario(id: number): void {
    this.subscription = this.usuarioService
    .actualizarUsuario(this.perfilForm.value, id)
    .subscribe(() => {
      this.usuarioService.actualizarUsuarioConectado();
    });

  }

  actualizarUsuarioConectado(): void {
    this.usuarioService.actualizarUsuarioConectado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  uploadUrl(id: number): string {
    return `${environment.apiURL}/foto-usuario/${id}`;
  }
}
