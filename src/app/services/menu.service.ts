import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '@models/menu.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuURL = `${environment.apiURL}/menu`;

  constructor(
    private http: HttpClient,
  ) { }

  obtenerMenus(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<{ menus: Menu[], total: number }> {
    const url = `${this.menuURL}?skip=${skip}&take=${take}&termino=${termino}`;
    return this.http.get<{ menus: Menu[], total: number }>(url);
  }

  obtenerMenu(id: number): Observable<Menu> {
    const url = `${this.menuURL}/${id}`;
    return this.http.get<Menu>(url);
  }

  actualizar(id: number, menu: Menu): Observable<{ mensaje: string }> {
    const url = `${this.menuURL}/${id}`;
    return this.http.put<{ mensaje: string }>(url, menu);
  }

  crear(menu: Menu): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.menuURL, menu);
  }

  borrar(id: number): Observable<{ mensaje: string }> {
    const url = `${this.menuURL}/${id}`;
    return this.http.delete<{ mensaje: string }>(url);
  }
}
