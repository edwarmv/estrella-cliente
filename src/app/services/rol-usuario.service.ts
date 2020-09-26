import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '@models/rol.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {
  rolUsuarioURL = `${environment.apiURL}/rol-usuario`;

  constructor(
    private http: HttpClient
  ) { }

  obtenerRolesUsuario(idUsuario: number): Observable<Rol[]> {
    const url = `${this.rolUsuarioURL}/${idUsuario}`;

    return this.http.get<Rol[]>(url);
  }

  asignarRolUsuario(idRol: number, idUsuario: number):
    Observable<{ mensaje: string }> {
    const body = { idRol, idUsuario };
    return this.http.post<{mensaje: string}>(this.rolUsuarioURL, body);
  }

  borrarRolUsuario(idRol: number, idUsuario: number):
  Observable<{mensaje: string}> {
    const url = `${this.rolUsuarioURL}/${idRol}/${idUsuario}`;
    return this.http.delete<{mensaje: string}>(url);
  }
}
