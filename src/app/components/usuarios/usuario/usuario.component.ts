import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '@models/usuario.model';
import { UsuarioService } from '@services/usuario.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuario$: Observable<Usuario>;
  idUsuario: number;
  usuarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      nitCI: ['', [Validators.required]],
      telefonoMovil: [''],
      telefonoFijo: [''],
      direccionDomicilio: [''],
      correoElectronico: [''],
      cuentaVerificada: [{ value: undefined, disabled: true }],
      esEmpleado: [],
      estado: [],
    });

    this.idUsuario = this.route.snapshot.params.id;

    if (this.idUsuario) {
      this.usuario$ = this.usuarioService.obtenerUsuario(this.idUsuario)
      .pipe(
        tap(usuario => {
          if (usuario) {
            this.usuarioForm.patchValue(usuario);
          }
        })
      );
    }
  }

  actualizarUsuario(id: number): void {
    if (this.usuarioForm.valid) {
      this.usuarioService
      .actualizarUsuario(this.usuarioForm.value, id)
      .pipe(take(1))
      .subscribe(resp => {
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

  get nombre(): AbstractControl {
    return this.usuarioForm.get('nombre');
  }

  get apellido(): AbstractControl {
    return this.usuarioForm.get('apellido');
  }

  get nitCI(): AbstractControl {
    return this.usuarioForm.get('nitCI');
  }
}
