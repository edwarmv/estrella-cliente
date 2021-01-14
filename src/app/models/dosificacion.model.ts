import { Factura } from './factura.model';
import { Sucursal } from './sucursal.model';

export class Dosificacion {
  constructor(
    public id: number,
    public numeroAutorizacion: string,
    public fechaLimiteEmision: Date,
    public llaveDosificacion: string,
    public sucursal: Sucursal[],
    public factura: Factura[],
  ) {}
}
