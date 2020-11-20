import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '@models/pedido.model';
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

  obtenerPedido(
    skip: number,
    take: number,
    termino: string
  ): Observable<{ pedidos: Pedido[], total: number }> {
    const url = `${this.pedidoURL}?\
skip=${skip}&take=${take}&termino=${termino}`;
    return this.http.get<{ pedidos: Pedido[], total: number }>(url);
  }
}
