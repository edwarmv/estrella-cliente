import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Producto } from '@models/producto.model';
import { BehaviorSubject, Subscription } from 'rxjs';

export class ProductoDataSource extends DataSource<Producto> {
  private length = 0;
  private pageSize: number;
  private cachedData = Array.from<Producto>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<Producto[]>(this.cachedData);
  private subscription = new Subscription();

  constructor(pageSize: number = 10) {
    super();
    this.pageSize = pageSize;
  }

  connect(collectionViewer: CollectionViewer): Observable<Producto[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end);
    }));
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

}
