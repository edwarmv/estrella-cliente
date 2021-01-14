import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type CodigoControl = {
  numeroAutorizacion: string,
  numeroFactura: string,
  nitCI: string,
  fechaTransaccion: string,
  montoTransaccion: string,
  llaveDosificacion: string,
};

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

  generarCodigoControl(codigoControl: CodigoControl): Observable<string> {
    const url = `${environment.apiURL}/factura/codigo-control`;

    return this.http.post<string>(url, codigoControl);
  }
}
