import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  links: TabsLinks[] = [
    { path: 'calendario-pedidos', name: 'Calendario de pedidos' },
    { path: 'lista-pedidos', name: 'Lista de pedidos' },
    { path: 'reportes', name: 'Reportes' },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
