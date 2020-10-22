import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { RolUsuario } from '@models/rol-usuario.model';
import { Usuario } from '@models/usuario.model';
import { AutenticacionService } from '@services/autenticacion.service';
import { RolUsuarioService } from '@services/rol-usuario.service';
import { SidebarService } from '@services/sidebar.service';
import { UsuarioService } from '@services/usuario.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  mediaQueryList: MediaQueryList;
  mediaQueryListenner: () => void;

  opened: boolean;

  usuario$: Observable<Usuario>;

  rolesUsuario$: Observable<RolUsuario[]>;

  constructor(
    private mediaMatcher: MediaMatcher,
    private changeDetector: ChangeDetectorRef,
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService,
    private rolUsuarioService: RolUsuarioService,
    private autenticacionService: AutenticacionService,

  ) { }

  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 999px)');
    this.mediaQueryListenner = () => this.changeDetector.detectChanges();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListenner);

    this.sidebarService.opened$.subscribe(opened => this.opened = opened);

    this.usuario$ = this.usuarioService.usuario;

    this.rolesUsuario$ = this.rolUsuarioService.rolesUsuario;
  }

  cambiarRolPorDefecto(idRol: number): void {
    this.rolUsuarioService.cambiarRolPorDefecto(idRol)
    .pipe(take(1))
    .subscribe(() => {
      this.rolUsuarioService.rolesUsuarioSubject.next(undefined);
    });
  }

  toggleSidevar(): void {
    this.sidebarService.toggle();
  }

  abrirMenu(): void {
    this.trigger.openMenu();
  }

  cerrarMenu(): void {
    this.trigger.closeMenu();
  }

  cerrarSesion(): void {
    this.autenticacionService.cerrarSesion();
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListenner);
  }
}
