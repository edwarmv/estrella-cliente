import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedidoURL = `${environment.apiURL}/pedido`;

  constructor(
    private http: HttpClient,
  ) { }

  crear(pedido: Pedido): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.pedidoURL, pedido);
  }

  actualizar(pedido: Pedido): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(this.pedidoURL, pedido);
  }

  obtenerPedidosPaginacion(
    skip: number = 0,
    take: number = 5,
    termino: string = '',
    estado: string = ''
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${this.pedidoURL}?&skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<{ pedidos: Pedido[], total: number }>(url);
  }

  /**
   * @param start Fecha inicial YYYY/MM/DD
   * @param end Fecha final YYYY/MM/DD
   */
  obtenerPedidos(
    {
      skip = 0,
      take = 5,
      start = '',
      end = '',
      termino = '',
      sort = 'fechaEntrega',
      order = 'DESC',
      estado = ''
    }: {
      skip?: number,
      take?: number,
      start?: string,
      end?: string,
      termino?: string,
      sort?: string,
      order?: 'DESC' | 'ASC',
      estado?: string,
    }
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${this.pedidoURL}?start=${start}&end=${end}&skip=${skip}&take=${take}&termino=${termino}&sort=${sort}&order=${order}&estado=${estado}`;

    return this.http.get<{ pedidos: Pedido[], total: number }>(url);
  }

  obtenerPedido(idPedido: number): Observable<Pedido> {
    const url = `${this.pedidoURL}/${idPedido}`;

    return this.http.get<Pedido>(url);
  }

  pedidosFacturados(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${environment.apiURL}/pedido-factura?\
skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<{ pedidos: Pedido[], total: number }>(url);
  }

  pedidoFacturado(idPedido: number): Observable<Pedido> {
    const url = `${environment.apiURL}/pedido-factura/${idPedido}`;

    return this.http.get<Pedido>(url);
  }

  reporte(estado: EstadoPedido | '', take: number): string {
    return `${environment.apiURL}/reporte-pedido?estado=${estado}&take=${take}`;
  }
}
