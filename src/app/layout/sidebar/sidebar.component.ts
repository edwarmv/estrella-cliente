import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  state,
  style,
  transition,
  animate,
  trigger
} from '@angular/animations';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subject } from 'rxjs';
import { RolMenuService } from '@services/rol-menu.service';
import { Menu } from '@models/menu.model';
import { takeUntil } from 'rxjs/operators';


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

  private unsubscribe = new Subject<void>();

  constructor(
    public usuarioService: UsuarioService,
    private rolMenuService: RolMenuService,
  ) { }

  ngOnInit(): void {
    this.rolMenuService.menus
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(menus => {
      this.menus = menus;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
