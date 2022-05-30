import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovimientoCaja } from '@models/movimiento-caja.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovimientoCajaService {
  url = `${environment.apiURL}/movimiento-caja`;

  constructor(private http: HttpClient) {}

  crear(
    movimientoCaja: MovimientoCaja
  ): Observable<{ value: MovimientoCaja; mensaje: string }> {
    return this.http.post<{ value: MovimientoCaja; mensaje: string }>(
      this.url,
      movimientoCaja
    );
  }

  obtenerMovimientosCajas({
    skip = 0,
    take = 5,
    startDate = '',
    endDate = '',
  }: {
    skip?: number;
    take?: number;
    startDate?: Date | '';
    endDate?: Date | '';
  }): Observable<{ values: MovimientoCaja[]; total: number }> {
    const url = `${this.url}?skip=${skip}&take=${take}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<{ values: MovimientoCaja[]; total: number }>(url);
  }
}
