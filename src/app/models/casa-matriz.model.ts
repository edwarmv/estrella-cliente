import { Sucursal } from './sucursal.model';

export class CasaMatriz {
  constructor(
    public id: number,
    public nombre: string,
    public ubicacion: string,
    public direccion: string,
    public descripcionActividadEconomica: string,
    public numeroTelefono: string,
    public correoElectronico: string,
    public nit: string,
    public logotipo: string,
    public sucursales: Sucursal[],
  ) {}
}
