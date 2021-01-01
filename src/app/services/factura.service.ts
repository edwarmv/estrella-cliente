import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  facturaURL = `${environment.apiURL}/factura-pedido`;

  constructor(
    private http: HttpClient,
  ) { }

  crearFacturaPedidoURL(idPedido: number): string {
    return `${environment.apiURL}/factura-pedido/${idPedido}`;
  }
}
