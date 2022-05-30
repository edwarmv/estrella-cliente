import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaProducto } from '@models/categoria-producto.model';
import { Producto } from '@models/producto.model';
import { CategoriaProductoProductoService } from '@services/categoria-producto-producto.service';
import { CategoriaProductoService } from '@services/categoria-producto.service';
import { ProductoService } from '@services/producto.service';
import { SnackBarService } from '@services/snack-bar.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  idProducto: string;
  producto: Producto;
  productoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private selectionListDialogService: SelectionListDialogService,
    private categoriaProductoService: CategoriaProductoService,
    private categoriaProductoProductoService: CategoriaProductoProductoService
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0.1, [Validators.required, Validators.min(0.1)]],
      estado: [true],
    });

    this.idProducto = this.route.snapshot.params.id;
    this.fetchProducto();
  }

  actualizarProducto(id: number): void {
    if (this.productoForm.valid) {
      this.productoService
        .actualizarProducto(id, this.productoForm.value)
        .subscribe(resp => {
          this.snackBarService.open(resp.mensaje);
        });
    }
  }

  urlActualizarFoto(idProducto: number): string {
    return `${environment.apiURL}/foto-producto/${idProducto}`;
  }

  crearProducto(): void {
    if (this.productoForm.valid) {
      this.productoService
        .crearProducto(this.productoForm.value)
        .subscribe(resp => {
          this.snackBarService.open(resp.mensaje);
          this.router.navigate(['/productos', resp.producto.id])
        });
    }
  }

  abrirSeleccionarCategoriaProduct(): void {
    this.selectionListDialogService
      .open<CategoriaProducto>({
        title: 'Seleccionar categoria',
        search: {
          placeholder: 'Nombre categoria',
        },
        cb: (skip, take, termino) => {
          return this.categoriaProductoService
            .obtenerCategoriasProductos({
              skip,
              take,
              termino,
            })
            .pipe(
              map(resp => {
                const categoriasProductos = resp.categoriasProductos.map(
                  categoriaProducto => ({
                    label: `${categoriaProducto.nombre}`,
                    value: categoriaProducto,
                  })
                );
                return {
                  values: categoriasProductos,
                  total: resp.total,
                };
              })
            );
        },
      })
      .subscribe(categoriaProducto => {
        if (categoriaProducto) {
          this.categoriaProductoProductoService
            .crear({
              producto: this.producto,
              categoriaProducto: categoriaProducto,
            })
            .subscribe(resp => {
              this.snackBarService.open(resp.mensaje);
              this.fetchProducto();
            });
        }
      });
  }

  borrarCategoria(idCategoria: number): void {
    this.categoriaProductoProductoService
      .borrar(idCategoria, parseInt(this.idProducto))
      .subscribe(resp => {
        this.fetchProducto();
        this.snackBarService.open(resp.mensaje);
      });
  }

  fetchProducto(): void {
    if (this.idProducto) {
      this.productoService
        .obtenerProducto(parseInt(this.idProducto))
        .subscribe(producto => {
          if (producto) {
            this.producto = producto;
            this.productoForm.patchValue(producto);
          }
        });
    }
  }

  get nombre(): AbstractControl {
    return this.productoForm.get('nombre');
  }

  get precio(): AbstractControl {
    return this.productoForm.get('precio');
  }
}
