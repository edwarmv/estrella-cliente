import { Caja } from './caja.model';
import { Usuario } from './usuario.model';

export enum TipoMovimientoCaja {
  INGRESO_EFECTIVO = 'ingreso_efectivo',
  RETIRO_EFECTIVO = 'retiro_efectivo',
}
export class MovimientoCaja {
  constructor(
    public id: number,
    public fechaMovimiento: Date,
    public tipo: TipoMovimientoCaja,
    public motivoMovimiento: string,
    public cantidad: number,
    public estadoAnterior: number,
    public estadoActual: number,
    public caja: Caja,
    public usuario: Usuario,
  ) {}
}
