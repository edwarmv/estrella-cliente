import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Lista de deliveries', path: 'lista-deliveries' },
    { name: 'Repartidores',        path: 'repartidores'     },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
