import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '@models/producto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type ObtenerProductos = {
  productos: Producto[],
  total: number
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productoURL = `${environment.apiURL}/producto`;

  constructor(private http: HttpClient) { }

  obtenerProductos(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<ObtenerProductos> {
    const url = `${this.productoURL}\
?skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<ObtenerProductos>(url);
  }

  obtenerProducto(id: number): Observable<Producto> {
    const url = `${this.productoURL}/${id}`;

    return this.http.get<Producto>(url);
  }

  crearProducto(producto: Producto): Observable<{mensaje: string}> {
    return this.http.post<{mensaje: string}>(this.productoURL, producto);
  }

  actualizarProducto(
    id: number,
    producto: Producto
  ): Observable<{mensaje: string}> {
    const url = `${this.productoURL}/${id}`;

    return this.http.put<{mensaje: string}>(url, producto);
  }

  borrarProducto(id: number): Observable<{ mensaje: string }> {
    const url = `${this.productoURL}/${id}`;

    return this.http.delete<{ mensaje: string }>(url);
  }
}
