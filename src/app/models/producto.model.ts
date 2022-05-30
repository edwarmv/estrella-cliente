import { CategoriaProductoProducto } from './categoria-producto-producto.model';

export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public foto: string,
    public estado: boolean,
    public categoriasProductosProductos: CategoriaProductoProducto[],
  ) {}
}
