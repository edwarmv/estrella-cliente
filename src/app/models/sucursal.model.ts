import { CasaMatriz } from './casa-matriz.model';
import { Dosificacion } from './dosificacion.model';

export class Sucursal {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string,
    public ubicacion: string,
    public numeroTelefono: string,
    public correoElectronico: string,
    public casaMatriz: CasaMatriz,
    public dosificaciones: Dosificacion[],
  ) {}
}
