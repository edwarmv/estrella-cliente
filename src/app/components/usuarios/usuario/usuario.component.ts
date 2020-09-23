import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuario$: Observable<Usuario>;
  usuarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      nitCI: [''],
      telefonoMovil: [''],
      telefonoFijo: [''],
      direccionDomicilio: [''],
      correoElectronico: [''],
      esEmpleado: []
    });

    this.usuario$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.usuarioService.obtenerUsuario(params.get('id'));
      }),
      tap(usuario => {
        if (usuario) {
          this.usuarioForm.patchValue(usuario);
        }
      })
    );
  }

  guardarCambios(id: number): void {
    this.usuarioService
    .actualizarUsuario(this.usuarioForm.value, id).subscribe();
  }

}
