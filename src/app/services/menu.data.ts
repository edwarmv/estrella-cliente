type Submenu = {
  nombre: string,
  path: string,
  activated: boolean
};

export type Menu = {
  nombre: string,
  collapsed: boolean,
  activated: boolean,
  submenus: Submenu[],
  // autorizacion?: string[]
};

export class MenuData {
  public static menus: Menu[] = [
    {
      nombre: 'Gestionar pedidos',
      collapsed: true,
      activated: false,
      submenus: [
        {
          nombre: 'Pedidos',
          path: '/pedidos',
          activated: false
        }
      ]
    },
    {
      nombre: 'Gestionar productos',
      collapsed: true,
      activated: false,
      submenus: [
        {
          nombre: 'Productos',
          path: '/productos',
          activated: false
        },
        {
          nombre: 'Registrar producto',
          path: '/productos/nuevo-producto',
          activated: false
        }
      ]
    },
    {
      nombre: 'Gestionar usuarios',
      collapsed: true,
      activated: false,
      submenus: [
        {
          nombre: 'Usuarios',
          path: '/usuarios',
          activated: false
        },
        // {
          // nombre: 'Registrar usuario',
          // path: '/usuarios/nuevo-usuario',
          // activated: false
        // }
      ]
    },
    {
      nombre: 'Gestionar roles',
      collapsed: true,
      activated: false,
      submenus: [
        {
          nombre: 'Roles',
          path: '/roles',
          activated: false
        },
        {
          nombre: 'Registrar rol',
          path: '/roles/nuevo-rol',
          activated: false
        }
      ]
    },
  ];
}
