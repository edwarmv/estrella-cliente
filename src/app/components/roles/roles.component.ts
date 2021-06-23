import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Lista de roles', path: 'lista-roles' }
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
