import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

type CrearUsuario = { token: string, mensaje: string };
export type ObtenerUsuarios = { usuarios: Usuario[], total: number };

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioSubject = new BehaviorSubject<undefined>(undefined);
  usuarioURL = `${environment.apiURL}/usuario`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get usuario(): Observable<Usuario> {
    const idUsuario = parseInt(localStorage.getItem('idUsuario'), 10);

    return this.usuarioSubject.pipe(
      switchMap(() => {
        return this.obtenerUsuario(idUsuario);
      })
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
    {
      skip = 0,
      take = 5,
      termino = '',
      rol = '',
    }: {
      skip?: number,
      take?: number,
      termino?: string,
      rol?: string,
    }
  ): Observable<ObtenerUsuarios> {
    const url = `${this.usuarioURL}\
?skip=${skip}&take=${take}&termino=${termino}&rol=${rol}`;
    return this.http.get<ObtenerUsuarios>(url);
  }

  crearUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<CrearUsuario>(this.usuarioURL, usuario).pipe(
      map(resp => {
        Swal.fire(resp.mensaje);
        this.router.navigate(['/login']);
      }),
    );
  }

  actualizarUsuario(
    usuario: Usuario,
    id: number
  ): Observable<{ mensaje: string }> {
    const url = `${this.usuarioURL}/${id}`;

    return this.http.put<{ mensaje: string }>(url, usuario);
  }

  cambiarEstado(id: number): Observable<{ mensaje: string }> {
    const url = `${this.usuarioURL}/${id}`;

    return this.http.delete<{ mensaje: string }>(url);
  }

}
