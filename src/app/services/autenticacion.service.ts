import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Rol } from '@models/rol.model';

type Payload = { exp: number, iat: number, roles: Rol[], sub: number };
type VerificarCuenta = { mensaje: string };

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login( correoElectronico: string, password: string): Observable<string> {
    const url = `${environment.apiURL}/iniciar-sesion`;

    return this.http.post<string>(url, {
      correoElectronico,
      password
    }).pipe(
      map(result => {
        this.guardarLocalStorage(result);
        this.router.navigate(['/home']);
        return result;
      }),
      catchError(error => throwError(error))
    );
  }

  verificarCuenta(token: string): Observable<VerificarCuenta> {
    const url = `${environment.apiURL}/verificar-usuario/${token}`;
    return this.http.get<VerificarCuenta>(url);
  }

  cerrarSesion(): void {
    this.limpiarLocalStorage();
    this.router.navigate(['/login']);
  }

  reenviarCorreoVerificacion(idUsuario: number):
    Observable<{ mensaje: string }> {
    const url = `${environment.apiURL}/reenviar-correo-verificacion/${idUsuario}`;

    return this.http.get<{ mensaje: string }>(url);
  }

  guardarLocalStorage(token: string): void {
    const payload: Payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);
    localStorage.setItem('idUsuario', payload.sub.toString());
    // localStorage.setItem('roles', JSON.stringify(payload.roles));
    localStorage.setItem('token', token);
  }

  limpiarLocalStorage(): void {
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('roles');
    localStorage.removeItem('token');
  }
}
