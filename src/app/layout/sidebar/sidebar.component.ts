import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  state,
  style,
  transition,
  animate,
  trigger
} from '@angular/animations';
import { RolService } from 'src/app/services/rol.service';
import { SidebarService } from '@services/sidebar.service';
import { Menu, MenuData } from '@services/menu.data';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('arrow', [
      state('right', style({
        transform: 'rotate(0)'
      })),
      state('down', style({
        transform: 'rotate(90deg)'
      })),
      transition('right => down', [
        animate('0.2s')
      ]),
      transition('down => right', [
        animate('0.2s')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  menus: Menu[];

  private subscription: Subscription = new Subscription();

  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let path: string = this.router.url;
    this.menus = this.cargarMenus(MenuData.menus, path);
    this.subscription = this.router.events.
      pipe(
        filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      path = this.router.url;
      this.menus = this.cargarMenus(MenuData.menus, path);
    });
  }

  toggleMenu(index: number): void {
    this.menus.filter((menu, i) => index !== i)
    .forEach(menu => menu.collapsed = true);
    this.menus[index].collapsed = !this.menus[index].collapsed;
  }

  /**
   * Cambia el estado activo de los menus
   * @param path Nombre de menu a activar
   */
  cargarMenus(menus: Menu[], path: string): Menu[] {
    menus.forEach(menu => {
      menu.activated = false;
      menu.submenus.forEach(submenu => submenu.activated = false);
    });

    const lastChildPath = path.split('/').slice(-1)[0];
    menus.forEach(menu => {
      menu.submenus.forEach(submenu => {
        const lastChildPatSubmenu = submenu.path.split('/').slice(-1)[0];
        if (lastChildPatSubmenu.indexOf(lastChildPath) >= 0) {
          submenu.activated = true;
          menu.activated = true;
          menu.collapsed = false;
        }
      });
    });
    return menus;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
