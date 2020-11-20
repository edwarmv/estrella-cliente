import { Pedido } from './pedido.model';
import { Producto } from './producto.model';

export class DetallePedido {
  constructor(
    public id: number,
    public precioUnitario: number,
    public cantidad: number,
    public pedido: Pedido,
    public producto: Producto,
  ) {}
}
