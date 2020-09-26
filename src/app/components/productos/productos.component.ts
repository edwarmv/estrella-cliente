import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@services/producto.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos$: Observable<Producto[]>;

  buscadorForm: FormGroup;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.productos$ = this.buscadorForm.get('termino').valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((termino: string) => {
        console.log(termino);
        return this.productoService.obtenerProductos(0, 0, termino).pipe(
          map(resp => resp.productos)
        );
      })
    );
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
