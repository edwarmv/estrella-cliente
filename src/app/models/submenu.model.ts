import { Menu } from '@models/menu.model';

export class Submenu {
  constructor(
    public id: number,
    public nombre: string,
    public path: string,
    public menu: Menu
  ) {}
}
