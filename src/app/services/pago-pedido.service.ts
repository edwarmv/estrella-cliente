import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoPedido } from '@models/pago-pedido.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoPedidoService {
  private url = `${environment.apiURL}/pago-pedido`;

  constructor(
    private http: HttpClient,
  ) { }

  obtenerPagos(
    idPedido: number | string
  ): Observable<{ pagosPedido: PagoPedido[], total: number }> {
    const url = `${this.url}/${idPedido}`;
    return this.http.get<{ pagosPedido: PagoPedido[], total: number }>(url);
  }

  actualizarPago(pagoPedido: PagoPedido): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(this.url, pagoPedido);
  }

  registrarPago(
    pagoPedido: PagoPedido
  ): Observable<{ mensaje: string, pagoPedido: PagoPedido }> {
    return this.http.post<{
      mensaje: string,
      pagoPedido: PagoPedido
    }>(this.url, pagoPedido);
  }

  borrarPago(idPagoPedido: number, idPedido: number): Observable<{ mensaje: string }> {
    const url = `${this.url}/${idPedido}/${idPagoPedido}`;
    return this.http.delete<{ mensaje: string }>(url);
  }
}
