import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Lista de sucursales', path: 'lista-sucursales' },
    { name: 'Lista de cajas', path: 'lista-cajas' },
    { name: 'Movimientos en cajas', path: 'movimientos-cajas' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
