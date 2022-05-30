import { Pedido } from "./pedido.model";

export class PagoPedido {
  constructor(
    public id: number,
    public monto: number,
    public fechaPago: Date,
    public pedido: Pedido,
  ) {}
}
