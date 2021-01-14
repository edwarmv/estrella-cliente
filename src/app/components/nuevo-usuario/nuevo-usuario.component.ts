import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { passwordMatch } from '@validators/password-match.validator';
import { UsuarioService } from '@services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit, OnDestroy {
  nuevoUsuarioForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {
    this.nuevoUsuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', Validators.required]
    }, {
      validator: passwordMatch('password', 'confirmarPassword')
    });
  }

  ngOnInit(): void {
  }

  crearUsuario(): void {
    if (this.nuevoUsuarioForm.valid) {
      this.subscription = this.usuarioService
      .crearUsuario(this.nuevoUsuarioForm.value)
      .subscribe();
    }
  }

  get nombre(): AbstractControl {
    return this.nuevoUsuarioForm.get('nombre');
  }

  get apellido(): AbstractControl {
    return this.nuevoUsuarioForm.get('apellido');
  }

  get correoElectronico(): AbstractControl {
    return this.nuevoUsuarioForm.get('correoElectronico');
  }

  get password(): AbstractControl {
    return this.nuevoUsuarioForm.get('password');
  }

  get confirmarPassword(): AbstractControl {
    return this.nuevoUsuarioForm.get('confirmarPassword');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
