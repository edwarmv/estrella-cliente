import { Cliente } from './cliente.model';
import { DetallePedido } from './detalle-pedido.model';
import { PedidoRepartidor } from './pedido-repartidor.model';
import { Usuario } from './usuario.model';

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  LISTO = 'listo',
  ENTREGADO = 'entregado',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado'
}

export class Pedido {
  constructor(
    public id: number,
    public fechaRegistro: Date,
    public fechaEntrega: Date,
    public conServicioEntrega: boolean,
    public direccionEntrega: string,
    public coordenadasDireccionEntrega: string,
    public estado: EstadoPedido,
    public usuario: Usuario,
    public cliente: Cliente,
    public pedidosRepartidores: PedidoRepartidor[],
    public detallesPedidos: DetallePedido[],
  ) {}
}
