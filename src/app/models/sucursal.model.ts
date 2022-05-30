import { Caja } from './caja.model';
import { CasaMatriz } from './casa-matriz.model';
import { Dosificacion } from './dosificacion.model';
import { ProductoSucursal } from './producto-sucursal.model';

export class Sucursal {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string,
    public ubicacion: string,
    public numeroTelefono: string,
    public estado: boolean,
    public casaMatriz: CasaMatriz,
    public dosificaciones: Dosificacion[],
    public cajas: Caja[],
    public productosSucursales: ProductoSucursal[],
  ) {}
}
