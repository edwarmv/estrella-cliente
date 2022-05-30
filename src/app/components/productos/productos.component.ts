import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  links: TabsLinks[] = [
    { path: 'view', name: 'Productos' },
    { path: 'categorias', name: 'Categorias' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
