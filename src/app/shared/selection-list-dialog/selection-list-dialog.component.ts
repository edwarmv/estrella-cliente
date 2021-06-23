import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SelectionListDataSource } from './selection-list-data-source';

export type SelectionListItem = {
  label: string,
  value: any,
};

export type SelectionListCB = (
  skip: number,
  take: number,
  termino: string
) => Observable<{ values: SelectionListItem[], total: number }>;

export type SelectionListData = {
  title: string,
  search: {
    placeholder: string,
    hide?: boolean
  },
  cb: SelectionListCB,
  customElement?: TemplateRef<any>,
};

@Component({
  selector: 'app-selection-list-dialog',
  templateUrl: './selection-list-dialog.component.html',
  styleUrls: ['./selection-list-dialog.component.scss']
})
export class SelectionListDialogComponent implements OnInit, OnDestroy {
  items: SelectionListDataSource;
  unsubscribe$ = new Subject<void>();
  buscador: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SelectionListData,
    public dialogRef: MatDialogRef<SelectionListDialogComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.items = new SelectionListDataSource({ cb: this.data.cb });
    this.buscador = this.fb.group({
      termino: ['']
    });
    this.termino.valueChanges
    .pipe(takeUntil(this.unsubscribe$), debounceTime(300))
    .subscribe(value => {
      this.items.termino = value;
    });
  }

  seleccionarItem(item: any): void {
    this.dialogRef.close(item);
  }

  close(): void {
    this.dialogRef.close();
  }

  get termino(): AbstractControl {
    return this.buscador.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
