import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pedido } from '@models/pedido.model';
import { PedidoService } from '@services/pedido.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit, OnDestroy {
  pedidos$: Observable<Pedido[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  totalPedidos: number;
  pageIndex = 0;
  pageSize = 5;
  displayedColumns: string [] = [
    'posicion',
    'cliente',
    'fechaEntrega',
    'estado',
    'detalles'
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
      tap(() => {
        this.paginator.firstPage();
        this.pedidos$ = this.obtenerPedidos(0, this.pageSize);
      })
    )
    .subscribe();
  }

  obtenerPedidos(skip: number, take: number): Observable<Pedido[]> {
    const termino = this.termino.value;

    return this.pedidoService.obtenerPedidosPaginacion(skip, take, termino)
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

    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.pedidos$ = this.obtenerPedidos(skip, take);
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
