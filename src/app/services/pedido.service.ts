import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url = `${environment.apiURL}/pedido`;

  constructor(
    private http: HttpClient,
  ) { }

  crear(pedido: Pedido): Observable<{ mensaje: string, pedido: Pedido }> {
    return this.http.post<{
    mensaje: string,
    pedido: Pedido
    }>(this.url, pedido);
  }

  actualizar(pedido: Pedido): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(this.url, pedido);
  }

  obtenerPedidosPaginacion(
    skip: number = 0,
    take: number = 5,
    termino: string = '',
    estado: string = ''
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${this.url}?&skip=${skip}&take=${take}&termino=${termino}`;

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
      estado = '',
      conServicioEntrega = 0,
      repartidorAsignado = '',
      idRepartidor = '',
    }: {
      skip?: number,
      take?: number,
      start?: string,
      end?: string,
      termino?: string,
      sort?: string,
      order?: 'DESC' | 'ASC',
      estado?: EstadoPedido | '',
      conServicioEntrega?: 1 | 0,
      repartidorAsignado?: '' | 1 | 0,
      idRepartidor?: number | '',
    }
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${this.url}?start=${start}&end=${end}&skip=${skip}&take=${take}&termino=${termino}&sort=${sort}&order=${order}&estado=${estado}&conServicioEntrega=${conServicioEntrega}&repartidorAsignado=${repartidorAsignado}&idRepartidor=${idRepartidor}`;

    return this.http.get<{ pedidos: Pedido[], total: number }>(url);
  }

  obtenerPedido(idPedido: number): Observable<Pedido> {
    const url = `${this.url}/${idPedido}`;

    return this.http.get<Pedido>(url);
  }

  pedidosFacturados(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${this.url}/factura?\
skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<{ pedidos: Pedido[], total: number }>(url);
  }

  pedidoFacturado(idPedido: number): Observable<Pedido> {
    const url = `${this.url}/factura/${idPedido}`;

    return this.http.get<Pedido>(url);
  }

  crearFactura(idPedido: number): string {
    return `${this.url}/factura/${idPedido}`;
  }

  anularFactura(idPedido: number): Observable<{ mensaje: string }> {
    const url = `${this.url}/factura/anular/${idPedido}`;
    return this.http.get<{ mensaje: string }>(url);
  }

  reporte(estado: EstadoPedido | '', take: number): string {
    return `${this.url}/reporte?estado=${estado}&take=${take}`;
  }

  asignarRepartidor(
    idPedido: number,
    idRepartidor: number
  ): Observable<{ mensaje: string }> {
    const url = `${this.url}/repartidor`;
    return this.http.post<{ mensaje: string }>(url, { idPedido, idRepartidor });
  }
}
