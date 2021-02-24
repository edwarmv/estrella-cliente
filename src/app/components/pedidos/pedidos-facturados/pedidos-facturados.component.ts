import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-facturados',
  templateUrl: './pedidos-facturados.component.html',
  styleUrls: ['./pedidos-facturados.component.scss']
})
export class PedidosFacturadosComponent implements OnInit, OnDestroy {
  pedidos$: Observable<Pedido[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  totalPedidos: number;
  pageIndex = 0;
  pageSize = 5;
  displayedColumns: string [] = [
    'posicion',
    'cliente',
    'fechaFacturacion',
    'detalle'
  ];
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private pedidoService: PedidoService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.pedidos$ = this.obtenerPedidos(0, this.pageSize);

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
    ).subscribe(() => {
      this.paginator.firstPage();
      this.pedidos$ = this.obtenerPedidos(0, this.pageSize);
    });
  }

  obtenerPedidos(skip: number, take: number): Observable<Pedido[]> {
    const termino = this.termino.value;

    return this.pedidoService.pedidosFacturados(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalPedidos = resp.total;
        return resp.pedidos;
      })
    );
  }

  updateTable(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    this.pedidos$ = this.obtenerPedidos(
      this.pageSize,
      this.pageIndex * this.pageSize
    );
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
