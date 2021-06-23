import { Component, OnInit } from '@angular/core';
import { TabsLinks } from '@shared/tabs/tabs-links.type';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  links: TabsLinks[] = [
    { name: 'Casa matriz', path: 'casa-matriz' },
    {
      name: 'Generador de código de control',
      path: 'generador-codigo-control'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
