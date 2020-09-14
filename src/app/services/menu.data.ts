type Submenu = { nombre: string, path: string };

export type Menu = {
  nombre: string,
  path?: string,
  collapsed: boolean,
  submenus: Submenu[],
  autorizacion?: string[]
};

export const menus: Menu[] = [
  {
    nombre: 'Gestionar usuarios',
    path: '',
    collapsed: true,
    submenus: [
      {
        nombre: 'Usuarios',
        path: '/usuarios'
      },
      {
        nombre: 'Roles',
        path: '/roles'
      }
    ]
  },
  {
    nombre: 'Gestionar usuarios',
    path: '/usuarios',
    collapsed: true,
    submenus: [
      {
        nombre: 'Gestionar roles',
        path: '/roles'
      }
    ]
  },
  {
    nombre: 'Gestionar usuarios',
    path: '/usuarios',
    collapsed: true,
    submenus: [
      {
        nombre: 'Gestionar roles',
        path: '/roles'
      }
    ]
  },
];
