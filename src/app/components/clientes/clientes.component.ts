import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Cliente } from '@models/cliente.model';
import { ClienteService } from '@services/cliente.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy {
  clientes$: Observable<Cliente[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  displayedColumns: string[] = [
    'posicion',
    'nombre',
    'apellido',
    'nitCI',
    'modificar'
  ];
  @ViewChild('paginator') paginator: MatPaginator;
  totalClientes: number;
  pageIndex = 0;
  pageSize = 5;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.clientes$ = this.obtenerClientes(0, this.pageSize);

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
    ).subscribe(() => {
      this.paginator.firstPage();
      this.clientes$ = this.obtenerClientes(0, this.pageSize);
    });
  }

  obtenerClientes(skip: number, take: number): Observable<Cliente[]> {
    const termino = this.termino.value;
    return this.clienteService.obtenerClientes(skip, take, termino)
    .pipe(map(resp => {
      this.totalClientes = resp.total;
      return resp.clientes;
    }));
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.clientes$ = this.obtenerClientes(skip, take);
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
