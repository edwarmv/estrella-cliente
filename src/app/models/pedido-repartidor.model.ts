import { Pedido } from './pedido.model';
import { Usuario } from './usuario.model';

export class PedidoRepartidor {
  constructor(
    public pedido: Pedido,
    public usuario: Usuario,
  ) {}
}
