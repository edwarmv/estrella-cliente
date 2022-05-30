import { CategoriaProductoProducto } from "./categoria-producto-producto.model";

export class CategoriaProducto {
  constructor(
    public id: number,
    public nombre: string,
    public categoriasProductosProductos: CategoriaProductoProducto[],
  ) { }
}
