import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutenticacionService } from '@services/autenticacion.service';
import {
  MessageDialogService
} from '@components/message-dialog/message-dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  idUsuario: number;

  loginForm: FormGroup;

  mensaje: {
    mensaje: {
      mensaje: string,
      idUsuario: number
    },
    status: number
  };

  cargandoApp = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private messageDialogService: MessageDialogService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correoElectronico: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      recuerdame: [false]
    });

    this.correoElectronico.setValue(
      localStorage.getItem('correoElectronico') || ''
    );

    if (this.correoElectronico.value.length > 0) {
      this.recuerdame.setValue(true);
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.cargandoApp = true;

      this.subscription = this.autenticacionService
        .login( this.correoElectronico.value, this.password.value)
        .subscribe(() => {
          if (this.recuerdame.value) {
            localStorage.setItem(
              'correoElectronico',
              this.correoElectronico.value
            );
          }
          this.cargandoApp = false;
        }, ({ error, status }) => {
          console.log(error, status);

          if (status === 401) {
            this.idUsuario = error.idUsuario;
          }

          this.mensaje = {
            mensaje: error,
            status
          };

          this.cargandoApp = false;
        });
    }
  }

  reenviarCorreoVerificacion(): void {
    this.autenticacionService.reenviarCorreoVerificacion(this.idUsuario)
    .subscribe(resp => {
      this.messageDialogService.openDialog({
        title: 'Reenviar correo de virificación',
        message: resp.mensaje
      });
    });
  }

  get correoElectronico(): AbstractControl  {
    return this.loginForm.get('correoElectronico');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get recuerdame(): AbstractControl {
    return this.loginForm.get('recuerdame');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
