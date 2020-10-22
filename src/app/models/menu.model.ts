import { RolMenu } from './rol-menu.model';
import { Submenu } from './submenu.model';

export class Menu {
  constructor(
    public id: number,
    public nombre: string,
    public rolesMenus: RolMenu[],
    public submenus: Submenu[]
  ) {}
}
