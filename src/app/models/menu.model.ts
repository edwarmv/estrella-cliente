import { RolMenu } from './rol-menu.model';

export class Menu {
  constructor(
    public id: number,
    public nombre: string,
    public path: string,
    public rolesMenus: RolMenu[],
  ) {}
}
