import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Lista de clientes', path: 'lista-clientes' },
  ];

  activeLink = 'lista-clientes';

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
