import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module')
    .then(m => m.LoginModule),
    data: {
      showHeader: false,
      showSidebar: false
    }
  },
  {
    path: 'nuevo-usuario',
    loadChildren: () => import('./components/nuevo-usuario/nuevo-usuario.module')
    .then(m => m.NuevoUsuarioModule),
    data: {
      showHeader: false,
      showSidebar: false
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module')
    .then(m => m.HomeModule),
    data: {
      breadcrumb: 'Inicio'
    }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./components/usuarios/usuarios.module')
    .then(m => m.UsuariosModule),
    data: {
      breadcrumb: 'Administrar usuarios'
    }
  },
  {
    path: 'perfil',
    loadChildren: () => import('./components/perfil/pefil.module')
    .then(m => m.PefilModule),
    data: {
      breadcrumb: 'Perfil'
    }
  },
  {
    path: '**',
    loadChildren: () => import('./components/page-not-found/page-not-found.module')
    .then(m => m.PageNotFoundModule),
    data: {
      showHeader: false,
      showSidebar: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
