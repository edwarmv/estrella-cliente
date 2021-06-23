import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SelectionListCB, SelectionListItem } from './selection-list-dialog.component';
import { switchMap, take as takeRxJS, tap } from 'rxjs/operators';

export class SelectionListDataSource extends DataSource<SelectionListItem> {
  private _pageSize: number;
  private _cachedData = Array.from<SelectionListItem>({ length: 1 });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream =
    new BehaviorSubject<SelectionListItem[]>(this._cachedData);
  private readonly _subscription = new Subscription();
  private _termino = new BehaviorSubject<string>('');
  cb: SelectionListCB;
  length: number;

  constructor(
    { cb, pageSize = 10 }: { cb: SelectionListCB, pageSize?: number }
  ) {
    super();
    this.cb = cb;
    this._pageSize = pageSize;
  }

  connect(collectionViewer: CollectionViewer): Observable<SelectionListItem[]> {
    this._subscription.add(
      this._termino.pipe(
        switchMap(termino => {
          this._fetchedPages = new Set<number>();
          this._cachedData = Array.from<SelectionListItem>({ length: 1 });
          this._fetchPage(0, termino);
          return collectionViewer.viewChange.pipe(
            tap(range => {
              const startPage = this._getPageForIndex(range.start);
              const endPage = this._getPageForIndex(range.end - 1);
              for (let i = startPage; i <= endPage; i++) {
                this._fetchPage(i, termino);
              }
            })
          );
        })
      ).subscribe()
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number, termino: string): void {
    if (this._fetchedPages.has(page)) {
      return;
    }

    this._fetchedPages.add(page);
    const skip = page * this._pageSize;
    const take = this._pageSize;

    this.cb(skip, take, termino)
    .pipe(
      takeRxJS(1)
    )
    .subscribe(res => {
      this.length = res.total;
      this._cachedData.length = res.total;
      this._cachedData.splice(
        skip,
        take,
        ...res.values
      );
      this._dataStream.next(this._cachedData);
    });
  }

  set termino(termino: string) {
    this._termino.next(termino);
  }

  get termino(): string {
    return this._termino.value;
  }
}
