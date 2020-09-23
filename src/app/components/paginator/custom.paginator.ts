import { MatPaginatorIntl } from '@angular/material/paginator';
export function customPaginator(itemsPerPageLabel: string): MatPaginatorIntl {
  const usuariosPaginator = new MatPaginatorIntl();
  usuariosPaginator.itemsPerPageLabel = itemsPerPageLabel;
  usuariosPaginator.nextPageLabel = 'Siguiente página';
  usuariosPaginator.previousPageLabel = 'Página anterior';
  usuariosPaginator.firstPageLabel = 'Primera página';
  usuariosPaginator.lastPageLabel = 'Última página';
  usuariosPaginator.getRangeLabel
  = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
  return usuariosPaginator;
}

