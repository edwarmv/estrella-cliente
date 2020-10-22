import { Rol } from './rol.model';
import { Usuario } from './usuario.model';

export class RolUsuario {
  constructor(
    public rol: Rol,
    public usuario: Usuario,
    public rolPorDefecto: boolean,
  ) {}
}
