import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaProducto } from '@models/categoria-producto.model';
import { Producto } from '@models/producto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type ObtenerProductos = {
  productos: Producto[];
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  productoURL = `${environment.apiURL}/producto`;

  constructor(private http: HttpClient) {}

  obtenerProductos({
    skip = 0,
    take = 5,
    termino = '',
    categoriasProductos = [],
    estadoProducto = '',
  }: {
    skip?: number;
    take?: number;
    termino?: string;
    categoriasProductos?: CategoriaProducto[];
    estadoProducto?: 'true' | 'false' | '';
  }): Observable<ObtenerProductos> {
    const categoriasProductosNombres = JSON.stringify(
      categoriasProductos.map(categoriaProducto => categoriaProducto.nombre)
    );
    const url = `${this.productoURL}?skip=${skip}&take=${take}&termino=${termino}&categoriasProductos=${categoriasProductosNombres}&estadoProducto=${estadoProducto}`;

    return this.http.get<ObtenerProductos>(url);
  }

  obtenerProducto(id: number): Observable<Producto> {
    const url = `${this.productoURL}/${id}`;

    return this.http.get<Producto>(url);
  }

  crearProducto(
    producto: Producto
  ): Observable<{ mensaje: string; producto: Producto }> {
    return this.http.post<{ mensaje: string; producto: Producto }>(
      this.productoURL,
      producto
    );
  }

  actualizarProducto(
    id: number,
    producto: Producto
  ): Observable<{ mensaje: string }> {
    const url = `${this.productoURL}/${id}`;

    return this.http.put<{ mensaje: string }>(url, producto);
  }

  borrarProducto(id: number): Observable<{ mensaje: string }> {
    const url = `${this.productoURL}/${id}`;

    return this.http.delete<{ mensaje: string }>(url);
  }
}
