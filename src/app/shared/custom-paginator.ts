import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.setLabel('Items');
  }

  setLabel(label: string): void {
    this.itemsPerPageLabel = `${label} por página`;

    this.nextPageLabel = 'Siguiente página';

    this.previousPageLabel = 'Página anterior';

    this.firstPageLabel = 'Primera página';

    this.lastPageLabel = 'Última página';

    this.changes.next();
  }
}
