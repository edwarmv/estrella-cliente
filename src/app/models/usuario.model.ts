import { RolUsuario } from './rol-usuario.model';

export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public nitCI: string,
    public telefonoMovil: string,
    public telefonoFijo: string,
    public direccionDomicilio: string,
    public coordenadasDireccionDomicilio: string,
    public correoElectronico: string,
    public fotoPerfil: string,
    public esEmpleado: boolean,
    public estado: boolean,
    public rolesUsuarios: RolUsuario[]
  ) {}
}
