import {
    AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Column } from './column.interface';
import { Row } from './row.interface';
import { ServerDataSourceCB, ServerDataSource } from './server.data-source';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnDestroy, AfterViewInit {

  isServerDataSource = true;

  @Input() set rows(rows: Row<T>[]) {
    if (this.isServerDataSource) {
      this.isServerDataSource = false;
    }
    if (rows) {
      this.setClientDataSource(rows);
    }
  }
  clientDataSource = new MatTableDataSource<Row<T>>();

  @Input() set rowsCB(cb: ServerDataSourceCB<T>) {
    if (!this.isServerDataSource) {
      this.isServerDataSource = true;
    }
    if (cb) {
      this.setServerDataSource(cb);
    }
  }
  serverDataSource = new ServerDataSource<T>();

  @Input() columns: Column[];

  @Input() totalRows = 0;

  columnNames: string[];

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize: number = this.paginationSizes[0];
  @Output() page = new EventEmitter<PageEvent>();
  @Input() hidePaginator = false;
  private pageIndex: number;
  private pageSize: number;

  // buscador
  @Input() showSearch = true;
  @Input() searchPlaceholder = '';
  buscadorForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngAfterViewInit(): void {
    if (this.isServerDataSource) {
      this.paginator.page
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((pageEvent) => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
        this.fetchData(this.pageIndex * this.pageSize, this.pageSize);
      });
    } else {
      this.clientDataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    if (this.showSearch) {
      this.termino.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(200)
      ).subscribe((termino: string) => {
        if (this.isServerDataSource) {
          this.paginator.pageIndex = 0;
          this.fetchData(
            0,
            this.pageSize ? this.pageSize : this.defaultPageSize,
            termino
          );
        }
      });
    }

    this.columnNames = this.columns.map(column => column.name);

    if (this.isServerDataSource) {
      this.serverDataSource.total$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(total => this.totalRows = total);
    }
  }

  setClientDataSource(rows: Row<T>[]): void {
    this.clientDataSource.data = rows;
  }

  setServerDataSource(cb: ServerDataSourceCB<T>): void {
    this.serverDataSource.cb = cb;
    this.fetchData(0, this.pageSize ? this.pageSize : this.defaultPageSize);
  }

  fetchData(skip: number, take: number, termino: string = ''): void {
    this.serverDataSource.fetchData({
      skip,
      take,
      termino,
    });
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
