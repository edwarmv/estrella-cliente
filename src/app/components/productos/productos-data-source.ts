import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@services/producto.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

export class ProductoDataSource extends DataSource<Producto> {
  private length;
  private pageSize = 10;
  private cachedData = Array.from<Producto>({ length: 0 });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<Producto[]>(this.cachedData);
  private subscription = new Subscription();
  private lastEndPage = 0;

  constructor(
    private productoService: ProductoService,
    private termino: string = ''
  ) {
    super();
    this.fetchPage(0, 0);
  }

  connect(collectionViewer: CollectionViewer): Observable<Producto[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end);

      console.log(startPage, endPage, this.lastEndPage < endPage);

      if (this.lastEndPage < endPage) {
        this.lastEndPage = endPage;
        this.fetchPage(startPage, endPage * this.pageSize);
      }
    }));

    return this.dataStream;
  }

  disconnect(): void {
    console.log('disconnect');
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(startPage: number, endPage: number): void {
    this.productoService.obtenerProductos(endPage, this.pageSize, this.termino)
    .pipe(
      tap(res => {
        console.log(res);
      })
    )
    .subscribe(res => {
      this.cachedData = this.cachedData.concat(res.productos);
      this.dataStream.next(this.cachedData);
    });
  }

}
