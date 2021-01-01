import { Dosificacion } from './dosificacion';
import { Pedido } from './pedido.model';

export class Factura {
  constructor(
    public id: number,
    public numeroFactura: number,
    public fechaEmision: Date,
    public anulado: boolean,
    public dosificacion: Dosificacion,
    public pedido: Pedido,
  ) {}
}
