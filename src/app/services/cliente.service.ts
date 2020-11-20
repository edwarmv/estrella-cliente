import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@models/cliente.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type ObtenerClientes = {
  clientes: Cliente[],
  total: number,
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteURL = `${environment.apiURL}/cliente`;

  constructor(
    private http: HttpClient,
  ) { }

  obtenerClientes(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<ObtenerClientes> {
    const url = `${this.clienteURL}?\
skip=${skip}&\
take=${take}&\
termino=${termino}`;

    return this.http.get<ObtenerClientes>(url);
  }

  obtenerCliente(idCliente: number): Observable<Cliente> {
    const url = `${this.clienteURL}/${idCliente}`;

    return this.http.get<Cliente>(url);
  }

  crear(cliente: Cliente): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.clienteURL, cliente);
  }

  actualizar(
    idCliente: number,
    cliente: Cliente
  ): Observable<{ mensaje: string }> {
    const url = `${this.clienteURL}/${idCliente}`;

    return this.http.put<{ mensaje: string }>(url, cliente);
  }
}
