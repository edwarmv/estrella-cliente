import { Cliente } from './cliente.model';
import { DetallePedido } from './detalle-pedido.model';
import { Factura } from './factura.model';
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
    public coordenadasDireccionEntrega: { lat: number, lng: number },
    public estado: EstadoPedido,
    public usuario: Usuario,
    public cliente: Cliente,
    public repartidor: Usuario,
    public detallesPedidos: DetallePedido[],
    public factura: Factura,
  ) {}
}

