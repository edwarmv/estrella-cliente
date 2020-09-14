import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { menus, Menu } from './menu.data';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menus: Menu[];
  sidenav: MatSidenav;
  opened = new BehaviorSubject<boolean>(undefined);
  opened$ = this.opened.asObservable();

  constructor() {
    this.menus = menus;
    console.log(menus);
  }

  toggle(): void {
    this.sidenav.toggle();
  }
}
