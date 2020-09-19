import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

type CrearUsuario = { token: string, mensaje: string };
export type ObtenerUsuarios = { usuarios: Usuario[], total: number };

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioConectadoSubject = new BehaviorSubject<Usuario>(undefined);
  usuarioURL = `${environment.apiURL}/usuario`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }


  actualizarUsuarioConectado(): void {
    const idUsuario = parseInt(localStorage.getItem('idUsuario'), 10);
    const url = `${this.usuarioURL}/${idUsuario}`;

    this.http.get<Usuario>(url)
    .pipe(tap(resp => console.log(resp)))
    .subscribe(
      usuario => {
      this.usuarioConectadoSubject.next(usuario);
      },
      error => console.log(error)
    );
  }

  obtenerPerfil(): Observable<Usuario> {
    const idUsuario = parseInt(localStorage.getItem('idUsuario'), 10);
    const url = `${this.usuarioURL}/${idUsuario}`;

    return this.http.get<Usuario>(url);
  }

  obtenerUsuario(id: number | string): Observable<Usuario> {
    const url = `${this.usuarioURL}/${id}`;

    return this.http.get<Usuario>(url);
  }

  obtenerUsuarios(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<ObtenerUsuarios> {
    const url = `${this.usuarioURL}\
?skip=${skip}&take=${take}&termino=${termino}`;
    return this.http.get<ObtenerUsuarios>(url);
  }

  crearUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<CrearUsuario>(this.usuarioURL, usuario).pipe(
      map(resp => {
        Swal.fire(resp.mensaje);
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        Swal.fire(error.error.mensaje);
        return throwError(error);
      })
    );
  }

  actualizarUsuario(usuario: Usuario, id: number): Observable<Usuario> {
    const url = `${this.usuarioURL}/${id}`;

    return this.http.put<Usuario>(url, usuario)
    .pipe(
      map(resp => {
        this.snackBar.open('Usuario actualizado', 'Hecho', { duration: 2000 });
        return resp;
      })
    );
  }

  eliminarUsuario(id: number): Observable<{ mensaje: string }> {
    const url = `${this.usuarioURL}/${id}`;

    return this.http.delete<{ mensaje: string }>(url);
  }

}
