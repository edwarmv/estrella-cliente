import { Component, OnInit, OnDestroy } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { RolService } from 'src/app/services/rol.service';
import { SidebarService } from '@services/sidebar.service';
import { Menu, MenuData } from '@services/menu.data';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AutenticacionService } from '@services/autenticacion.service';
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
    private rolService: RolService,
    private sidebarService: SidebarService,
    public usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // cargamos los menus y marcamos el menu cuando cuando el componente se
    // destruye o crea debido al diseno responsive
    const firstChild = this.activatedRoute.firstChild;
    if (firstChild) {
      const path = firstChild.routeConfig.path;
      // hacemos una copia local de los menus
      this.menus = this.cargarMenus(
        JSON.parse(JSON.stringify(MenuData.menus)),
        path
      );
    } else {
      // cargamos los menus y marcamos el menu seleccionado cada vez que
      // se cambia de ruta
      this.subscription = this.router.events.
        pipe(
          filter(event => event instanceof NavigationEnd),
      ).subscribe(() => {
        const path: string = this.activatedRoute.firstChild.routeConfig.path;

        // hacemos una copia local de los menus
        this.menus = this.cargarMenus(
          JSON.parse(JSON.stringify(MenuData.menus)),
          path
        );
      });
    }
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
    menus.forEach((menu, index) => {
      if (menu.path && menu.path.includes(path)) {
        menu.activated = true;
      } else {
        menu.submenus.forEach(submenu => {
          if (submenu.path.includes(path)) {
            submenu.activated = true;
            menu.activated = true;
            menu.collapsed = false;
          }
        });
      }
    });
    return menus;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
