import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@services/producto.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto$: Observable<Producto>;

  subject = new BehaviorSubject(undefined);

  productoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      precio: [0]
    });

    const id = this.route.snapshot.params.id;

    if (id) {
      this.producto$ = this.subject.pipe(
        mergeMap(() => {
          return this.productoService.obtenerProducto(id).pipe(
            tap(producto => {
              this.productoForm.setValue({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio
              });
            })
          );
        })
      );
    }
  }

  obtenerNuevoProducto(evet: any): void {
    console.log('hola', evet);
    this.subject.next(undefined);
  }

  actualizarProducto(id: number): void {
    this.productoService.actualizarProducto(id, this.productoForm.value)
    .subscribe(resp => {
      this.snackBar.open(resp.mensaje, 'Aceptar', {
        duration: 2000
      });
    });
  }

  urlActualizarFoto(idProducto: number): string {
    return `${environment.apiURL}/foto-producto/${idProducto}`;
  }

  crearProducto(): void {
    this.productoService.crearProducto(this.productoForm.value)
    .subscribe(resp => {
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }

  borrarProducto(id: number): void {
    this.productoService.borrarProducto(id)
    .subscribe(resp => {
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      this.router.navigate(['/productos']);
    });
  }
}
