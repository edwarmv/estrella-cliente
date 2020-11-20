import { Pedido } from './pedido.model';

export class Cliente {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public nitCI: string,
    public telefonoFijo: string,
    public telefonoMovil: string,
    public direccionDomicilio: string,
    public coordenadasDireccionDomicilio: string,
    public pedidos: Pedido,
  ) {}
}
