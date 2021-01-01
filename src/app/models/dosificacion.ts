import { Factura } from './factura';
import { Sucursal } from './sucursal';

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
