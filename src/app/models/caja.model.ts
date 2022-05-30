import { MovimientoCaja } from './movimiento-caja.model';
import { Sucursal } from './sucursal.model';

export class Caja {
  constructor(
    public id: number,
    public nombre: string,
    public estado: boolean,
    public sucursal: Sucursal,
    public movimientosCajas: MovimientoCaja[],
  ) {}
}
