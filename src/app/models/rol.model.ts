import { RolUsuario } from './rol-usuario.model';

export class Rol {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion?: string,
    public rolesUsuarios?: RolUsuario[],
  ) {}
}
