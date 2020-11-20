import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Submenu } from '@models/submenu.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmenuService {
  submenuURL = `${environment.apiURL}/submenu`;

  constructor(
    private http: HttpClient,
  ) { }

  obtenerSubmenu(idSubmenu: number): Observable<Submenu> {
    const url = `${this.submenuURL}/${idSubmenu}`;

    return this.http.get<Submenu>(url);
  }

  obtenerSubmenus(
    skip: number,
    take: number,
    termino: string
  ): Observable<{ submenus: Submenu[], total: number }> {
    const url = `${this.submenuURL}?\
skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<{ submenus: Submenu[], total: number }>(url);
  }

  submenusNoAsignados(
    skip: number,
    take: number,
    termino: string
  ): Observable<{ submenus: Submenu[], total: number }> {
    const url = `${environment.apiURL}/submenus-no-asignados?\
skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<{ submenus: Submenu[], total: number }>(url);
  }

  crear(submenu: Submenu): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.submenuURL, submenu);
  }

  actualizar(id: number, submenu: Submenu): Observable<{ mensaje: string }> {
    const url = `${this.submenuURL}/${id}`;

    return this.http.put<{ mensaje: string }>(url, submenu);
  }

  borrar(id: number): Observable<{ mensaje: string }> {
    const url = `${this.submenuURL}/${id}`;

    return this.http.delete<{ mensaje: string }>(url);
  }
}
