import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take as takeRxJS } from 'rxjs/operators';
import { Row } from './row.interface';

export type ServerDataSourceCBParams = {
  skip: number,
  take: number,
  termino?: string,
};

export type ServerDataSourceCBRes<T> = {
  rows: Row<T>[],
  total: number
};

export type ServerDataSourceCB<T> = (
  {
    skip,
    take,
  }: ServerDataSourceCBParams
) => Observable<ServerDataSourceCBRes<T>>;

export class ServerDataSource<T> implements DataSource<Row<T>> {
  private dataSubject = new BehaviorSubject<Row<T>[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  private cbSubject = new BehaviorSubject<ServerDataSourceCB<T>>(null);
  public cb$ = this.cbSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<Row<T>[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
  }

  fetchData(
    {
      skip,
      take,
      termino = '',
    }: ServerDataSourceCBParams
  ): void {
    this.loadingSubject.next(true);

    this.cb$
    .pipe(
      takeRxJS(1),
      switchMap(cb => {
        return cb({ skip, take, termino });
      })
    )
    .subscribe(res => {
      this.totalSubject.next(res.total);
      this.dataSubject.next(res.rows);
    });
  }

  set cb(cb: ServerDataSourceCB<T>) {
    this.cbSubject.next(cb);
  }
}
