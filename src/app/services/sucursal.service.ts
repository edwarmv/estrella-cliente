import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sucursal } from '@models/sucursal.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  url = `${environment.apiURL}/sucursal`;

  constructor(private http: HttpClient) {}

  crear(sucursal: Sucursal): Observable<{ mensaje: string, value: Sucursal }> {
    return this.http.post<{ mensaje: string, value: Sucursal }>(this.url, sucursal);
  }

  actualizar(sucursal: Sucursal): Observable<{ mensaje: string }> {
    const url = `${this.url}/${sucursal.id}`;
    return this.http.put<{ mensaje: string }>(url, sucursal);
  }

  obtenerSucursal(idSucursal: number): Observable<{ value: Sucursal }> {
    const url = `${this.url}/${idSucursal}`;
    return this.http.get<{ value: Sucursal }>(url);
  }

  obtenerSucursales({
    skip = 0,
    take = 5,
    termino = '',
  }: {
    skip?: number;
    take?: number;
    termino?: string;
  }): Observable<{ values: Sucursal[]; total: number }> {
    const url = `${this.url}?skip=${skip}&take=${take}&termino=${termino}`;
    return this.http.get<{ values: Sucursal[]; total: number }>(url);
  }
}
