import { Pedido } from './pedido.model';
import { RolUsuario } from './rol-usuario.model';

export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public correoElectronico: string,
    public fotoPerfil: string,
    public estado: boolean,
    public rolesUsuarios: RolUsuario[],
    public pedidos: Pedido[],
  ) {}
}
