import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Lista de menús', path: 'lista-menus' },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
