import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '@models/menu.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {
  rolMenuURL = `${environment.apiURL}/rol-menu`;
  menusSubject = new BehaviorSubject<undefined>(undefined);

  constructor(
    private http: HttpClient
  ) { }

  get menus(): Observable<Menu[]> {
    const idUsuario = Number.parseInt(localStorage.getItem('idUsuario'), 10);

    return this.menusSubject.pipe(
      switchMap(() => {
        return this.obtenerMenusRolPorDefecto(idUsuario);
      })
    );
  }

  obtenerMenusRol(idRol: number): Observable<Menu[]> {
    const url = `${this.rolMenuURL}/${idRol}`;

    return this.http.get<Menu[]>(url);
  }

  obtenerMenusRolPorDefecto(idUsuario: number): Observable<Menu[]> {
    const url = `${environment.apiURL}/menus-rol-por-defecto/${idUsuario}`;

    return this.http.get<Menu[]>(url);
  }

  borrarRolMenu(
    idRol: number,
    idMenu: number
  ): Observable<{ mensaje: string }> {
    const url = `${this.rolMenuURL}/${idRol}/${idMenu}`;

    return this.http.delete<{ mensaje: string }>(url);
  }
}
