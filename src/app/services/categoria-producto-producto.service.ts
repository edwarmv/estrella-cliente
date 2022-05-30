import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaProductoProducto } from '@models/categoria-producto-producto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaProductoProductoService {
  url = `${environment.apiURL}/categoria-producto-producto`;

  constructor(private http: HttpClient) {}

  crear(
    categoriaProductoProducto: CategoriaProductoProducto
  ): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(
      this.url,
      categoriaProductoProducto
    );
  }

  borrar(
    idCategoriaProducto: number,
    idProducto: number
  ): Observable<{ mensaje: string }> {
    const url = `${this.url}/${idCategoriaProducto}/${idProducto}`;
    return this.http.delete<{ mensaje: string }>(url);
  }
}
