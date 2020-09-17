import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '@services/autenticacion.service';

@Component({
  selector: 'app-verificar-cuenta',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: ['./verificar-usuario.component.scss']
})
export class VerificarUsuarioComponent implements OnInit {
  token: string;
  mensaje: { mensaje: string, ok: boolean };
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    this.autenticacionService.verificarCuenta(this.token)
    .subscribe(res => {
      this.mensaje = {
        mensaje: res.mensaje,
        ok: true,
      };
      this.loading = false;
    }, err => {
      this.mensaje = {
        mensaje: err.error.mensaje,
        ok: false
      };
      this.loading = false;
    });
  }

}
