import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaProducto } from '@models/categoria-producto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaProductoService {
  url = `${environment.apiURL}/categoria-producto`;

  constructor(private http: HttpClient) {}

  crear(categoriaProducto: CategoriaProducto): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.url, categoriaProducto);
  }

  obtenerCategoriasProductos({
    skip = 0,
    take = 5,
    termino = '',
  }: {
    skip?: number;
    take?: number;
    termino?: string;
  }): Observable<{
    categoriasProductos: CategoriaProducto[];
    total: number;
  }> {
    const url = `${this.url}?skip=${skip}&take=${take}&termino=${termino}`;
    console.log(url);
    return this.http.get<{
      categoriasProductos: CategoriaProducto[];
      total: number;
    }>(url);
  }

  obtenerCategoriaPrdoucto(
    idCategoriaProducto: number
  ): Observable<CategoriaProducto> {
    const url = `${this.url}/${idCategoriaProducto}`;
    return this.http.get<CategoriaProducto>(url);
  }

  actualizarCategoriaProducto(
    categoriaProducto: CategoriaProducto
  ): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(this.url, categoriaProducto);
  }

  borrar(idCategoriaProducto: number): Observable<{ mensaje: string }> {
    const url = `${this.url}/${idCategoriaProducto}`;
    return this.http.delete<{ mensaje: string }>(url);
  }
}
