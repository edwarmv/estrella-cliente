import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import Swal from 'sweetalert2';

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

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolURL);
  }

}
