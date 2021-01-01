import { CasaMatriz } from './casa-matriz';
import { Dosificacion } from './dosificacion';

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
