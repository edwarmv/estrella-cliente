import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutenticacionService } from '@services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  message = '';
  cargandoApp = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.loginForm = this.fb.group({
      correoElectronico: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      recuerdame: [false]
    });
  }



  ngOnInit(): void {
    this.correoElectronico.setValue(localStorage.getItem('correoElectronico') || '');
    if (this.correoElectronico.value.length > 0) {
      this.recuerdame.setValue(true);
    }
  }

  login(): void {
    this.cargandoApp = true;
    this.subscription = this.autenticacionService
      .login( this.correoElectronico.value, this.password.value)
      .subscribe(() => {
        if (this.recuerdame.value) {
          localStorage.setItem('correoElectronico', this.correoElectronico.value);
        }
        this.cargandoApp = false;
      }, (error) => {
        console.log(error);
        this.message = error.error.error;
        this.cargandoApp = false;
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
