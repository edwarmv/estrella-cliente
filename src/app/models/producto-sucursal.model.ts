import { Producto } from './producto.model';
import { Sucursal } from './sucursal.model';

export class ProductoSucursal {
  constructor(
    public producto: Producto,
    public sucursal: Sucursal,
    public existencias: number,
  ) {}
}
