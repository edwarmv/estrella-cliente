import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caja } from '@models/caja.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  url = `${environment.apiURL}/caja`;

  constructor(private http: HttpClient) {}

  crear(caja: Caja): Observable<{ mensaje: string; value: Caja }> {
    return this.http.post<{ mensaje: string; value: Caja }>(this.url, caja);
  }

  actualizar(
    idCaja: number,
    caja: Caja
  ): Observable<{ mensaje: string; value: Caja }> {
    const url = `${this.url}/${idCaja}`;
    return this.http.put<{ mensaje: string; value: Caja }>(url, caja);
  }

  obtenerCajas({
    skip = 0,
    take = 5,
    termino = '',
  }: {
    skip?: number;
    take?: number;
    termino?: string;
  }): Observable<{ values: Caja[]; total: number }> {
    const url = `${this.url}?skip=${skip}&take=${take}&termino=${termino}`;
    return this.http.get<{ values: Caja[]; total: number }>(url);
  }

  obtenerCaja(idCaja: number): Observable<{ value: Caja }> {
    const url = `${this.url}/${idCaja}`;
    return this.http.get<{ value: Caja; total: number }>(url);
  }
}
