import { Sucursal } from './sucursal';

export class CasaMatriz {
  constructor(
    public id: number,
    public nombre: string,
    public ubicacion: string,
    public direccion: string,
    public descripcionActivadEconomica: string,
    public numeroTelefono: string,
    public correoElectronico: string,
    public nit: string,
    public logotipo: string,
    public sucursales: Sucursal[],
  ) {}
}
