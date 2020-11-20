import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolUsuario } from '@models/rol-usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RolMenuService } from './rol-menu.service';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {
  rolUsuarioURL = `${environment.apiURL}/rol-usuario`;
  rolesUsuarioSubject = new BehaviorSubject<undefined>(undefined);

  constructor(
    private http: HttpClient,
    private rolMenuService: RolMenuService,
  ) { }

  get rolesUsuario(): Observable<RolUsuario[]> {
    const idUsuario = Number.parseInt(localStorage.getItem('idUsuario'), 10);

    return this.rolesUsuarioSubject.pipe(
      switchMap(() => {
        return this.obtenerRolesUsuario(idUsuario);
      })
    );
  }

  obtenerRolesUsuario(idUsuario: number): Observable<RolUsuario[]> {
    const url = `${this.rolUsuarioURL}/${idUsuario}`;

    return this.http.get<RolUsuario[]>(url);
  }

  cambiarRolPorDefecto(idRol: number): Observable<{ mensaje: string }> {
    const url = `${environment.apiURL}/rol-por-defecto`;

    return this.http.put<{ mensaje: string }>(url, { idRol })
    .pipe(
      tap(() => {
        this.rolMenuService.menusSubject.next(undefined);
      })
    );
  }

  asignarRolUsuario(rolUsuario: RolUsuario): Observable<{ mensaje: string }> {
    return this.http.post<{mensaje: string}>(this.rolUsuarioURL, rolUsuario);
  }

  borrarRolUsuario(idRol: number, idUsuario: number):
  Observable<{mensaje: string}> {
    const url = `${this.rolUsuarioURL}/${idRol}/${idUsuario}`;
    return this.http.delete<{mensaje: string}>(url);
  }
}
