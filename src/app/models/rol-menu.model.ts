import { Menu } from '@models/menu.model';
import { Rol } from './rol.model';

export class RolMenu {
  constructor(
    public rol: Rol,
    public menu: Menu
  ) {}
}
