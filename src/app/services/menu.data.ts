type Submenu = {
  nombre: string,
  path: string,
  activated: boolean
};

export type Menu = {
  nombre: string,
  path?: string,
  collapsed: boolean,
  activated: boolean,
  submenus: Submenu[],
  autorizacion?: string[]
};

export class MenuData {
  public static menus: Menu[] = [
    {
      nombre: 'Gestionar usuarios',
      path: undefined,
      collapsed: true,
      activated: false,
      submenus: [
        {
          nombre: 'Usuarios',
          path: '/usuarios',
          activated: false
        },
        {
          nombre: 'Roles',
          path: '/roles',
          activated: false
        }
      ]
    },
    {
      nombre: 'Gestionar usuarios',
      path: '/usuarios',
      collapsed: undefined,
      activated: false,
      submenus: []
    },
    {
      nombre: 'Gestionar usuarios',
      path: undefined,
      collapsed: true,
      activated: false,
      submenus: [
        {
          nombre: 'Gestionar roles',
          path: '/roles',
          activated: false
        }
      ]
    },
  ];
} 
