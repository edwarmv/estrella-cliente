import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@components/login/login.module')
    .then(m => m.LoginModule),
    data: {
      showHeader: false,
      showSidebar: false,
      showBreadcrumbs: false
    }
  },
  {
    path: 'nuevo-usuario',
    loadChildren: () =>
      import('@components/nuevo-usuario/nuevo-usuario.module')
      .then(m => m.NuevoUsuarioModule),
    data: {
      showHeader: false,
      showSidebar: false,
      showBreadcrumbs: false
    }
  },
  {
    path: 'verificar-usuario/:token',
    loadChildren: () => import('@components/verificar-usuario/verificar-usuario.module')
    .then(m => m.VerificarUsuarioModule),
    data: {
      showHeader: false,
      showSidebar: false,
      showBreadcrumbs: false
    }
  },
  {
    path: 'home',
    loadChildren: () => import('@components/home/home.module')
    .then(m => m.HomeModule),
    data: {
      breadcrumb: 'Inicio'
    }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('@components/usuarios/usuarios.module')
    .then(m => m.UsuariosModule),
    data: {
      breadcrumb: 'Gestionar usuarios'
    }
  },
  {
    path: 'roles',
    loadChildren: () => import('@components/roles/roles.module')
    .then(m => m.RolesModule),
    data: {
      breadcrumb: 'Gestionar roles'
    }
  },
  {
    path: 'menus',
    loadChildren: () => import('@components/menus/menus.module')
    .then(m => m.MenusModule),
    data: {
      breadcrumb: 'Gestionar Men√∫s'
    }
  },
  {
    path: 'submenus',
    loadChildren: () => import('@components/submenus/submenus.module')
    .then(m => m.SubmenusModule),
    data: {
      breadcrumb: 'Gestionar Submen√∫s'
    }
  },
  {
    path: 'clientes',
    loadChildren: () => import('@components/clientes/clientes.module')
    .then(m => m.ClientesModule),
    data: {
      breadcrumb: 'Gestionar Clientes'
    }
  },
  {
    path: 'perfil',
    loadChildren: () => import('@components/perfil/pefil.module')
    .then(m => m.PefilModule),
    data: {
      breadcrumb: 'Perfil'
    }
  },
  {
    path: 'productos',
    loadChildren: () => import('@components/productos/productos.module')
    .then(m => m.ProductosModule),
    data: {
      breadcrumb: 'Productos'
    }
  },
  {
    path: 'pedidos',
    loadChildren: () => import('@components/pedidos/pedidos.module')
    .then(m => m.PedidosModule),
    data: {
      breadcrumb: 'Pedidos'
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('@components/page-not-found/page-not-found.module')
    .then(m => m.PageNotFoundModule),
    data: {
      showHeader: false,
      showSidebar: false,
      showBreadcrumbs: false,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
