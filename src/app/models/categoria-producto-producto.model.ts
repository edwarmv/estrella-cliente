import { CategoriaProducto } from './categoria-producto.model';
import { Producto } from './producto.model';

export class CategoriaProductoProducto {
  constructor(
    public categoriaProducto: CategoriaProducto,
    public producto: Producto,
  ) {}
}
