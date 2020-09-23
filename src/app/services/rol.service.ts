import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import Swal from 'sweetalert2';

type ObtenerRoles = { roles: Rol[], total: number };
type EliminarRol = { mensaje: string };
type ActualizarRol = { mensaje: string };

@Injectable({
  providedIn: 'root'
})
export class RolService {
  rolURL = `${environment.apiURL}/rol`;

  constructor(
    private http: HttpClient,
    private autenticacioService: AutenticacionService
  ) { }

  obtenerRolesUsuarioConectado(): Rol[] {
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (!roles) {
      this.autenticacioService.cerrarSesion();
      Swal.fire('Algo salió mal. Por favor vuelva a iniciar sesión');
    } else {
      return roles;
    }
  }

  cargarRolSeleccionado(): Rol {
    return JSON.parse(localStorage.getItem('rolSeleccionado'));
  }

  obtenerRolesUsuario(idUsuario: number): Observable<Rol[]> {
    const url = `${environment.apiURL}/rol-usuario/${idUsuario}`;

    return this.http.get<Rol[]>(url);
  }

  obtenerRolUsuario(idRol: number, idUsuario: number): Observable<Rol> {
    const url = `${environment.apiURL}/rol-usuario/${idRol}/${idUsuario}`;

    return this.http.get<Rol>(url);
  }

  obtenerRoles(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<ObtenerRoles> {
    const url = `${this.rolURL}?skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<ObtenerRoles>(url);
  }

  obtenerRol(id: number): Observable<Rol> {
    const url = `${this.rolURL}/${id}`;

    return this.http.get<Rol>(url);
  }

  actualiarRol(id: number, rol: Rol): Observable<ActualizarRol> {
    const url = `${this.rolURL}/${id}`;

    return this.http.put<ActualizarRol>(url, rol);
  }

  eliminarRol(id: number): Observable<EliminarRol> {
    const url = `${this.rolURL}/${id}`;

    return this.http.delete<EliminarRol>(url);
  }
}
