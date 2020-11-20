import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '@models/menu.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

type SubmenuSidebar = {
  nombre: string,
  path: string,
  activated: boolean
};

export type MenuSidebar = {
  nombre: string,
  collapsed: boolean,
  activated: boolean,
  submenus: SubmenuSidebar[],
};

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {
  rolMenuURL = `${environment.apiURL}/rol-menu`;
  menusSubject = new BehaviorSubject<undefined>(undefined);

  constructor(
    private http: HttpClient
  ) { }

  get menus(): Observable<MenuSidebar[]> {
    const idUsuario = Number.parseInt(localStorage.getItem('idUsuario'), 10);

    return this.menusSubject.pipe(
      switchMap(() => {
        return this.obtenerMenusRolPorDefecto(idUsuario)
        .pipe(
          map(menus => {
            const menusSidebar = menus.map(menu => {
              const submenusSidebar: SubmenuSidebar[] = menu.submenus
              .map(submenu => {
                return {
                  nombre: submenu.nombre,
                  activated: false,
                  path: submenu.path,
                } as SubmenuSidebar;
              });

              return {
                nombre: menu.nombre,
                collapsed: true,
                activated: false,
                submenus: submenusSidebar
              } as MenuSidebar;
            });

            return menusSidebar;
          })
        );
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
