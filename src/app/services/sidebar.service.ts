import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sidenav: MatSidenav;
  opened = new BehaviorSubject<boolean>(undefined);
  opened$ = this.opened.asObservable();

  constructor() {
  }

  toggle(): void {
    this.sidenav.toggle();
  }
}
