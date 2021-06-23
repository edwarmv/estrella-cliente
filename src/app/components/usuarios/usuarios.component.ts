import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Lista de usuarios', path: 'lista-usuarios' },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
