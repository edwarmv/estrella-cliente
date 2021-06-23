import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@models/cliente.model';
import { EstadoPedido, Pedido } from '@models/pedido.model';
import { Producto } from '@models/producto.model';
import { PedidoService } from '@services/pedido.service';
import { UsuarioService } from '@services/usuario.service';
import { Subject } from 'rxjs';
import { map, mergeMap, startWith, take as takeRxJS, takeUntil } from 'rxjs/operators';
import { format } from 'date-fns';
import { formArraySize } from '@validators/form-array-size.validator';
import { DetallePedido } from '@models/detalle-pedido.model';
import { GoogleMapsService } from '@services/google-maps.service';
import { GoogleMap } from '@angular/google-maps';
import { MessageDialogService } from '@shared/message-dialog/message-dialog.service';
import { SnackBarService } from '@services/snack-bar.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { ClienteService } from '@services/cliente.service';
import { ProductoService } from '@services/producto.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit, OnDestroy {
  idPedido: number;
  pedidoForm: FormGroup;
  estadosPedido = Object.values(EstadoPedido);
  private unsubscribe$ = new Subject<void>();

  // Google Maps
  apiLoaded = false;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    clickableIcons: false
  };
  center: google.maps.LatLngLiteral = { lat: -21.530233, lng: -64.729882 };
  markPosition: google.maps.LatLngLiteral = null;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  isDesktop: boolean;

  @ViewChild('customElement', { static: true }) customElement: TemplateRef<any>;

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private snackBarService: SnackBarService,
    private googleMapsService: GoogleMapsService,
    private selectionListDialogService: SelectionListDialogService,
    private messageDialogService: MessageDialogService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.pedidoForm = this.pedidoFormGroup();

    this.idPedido = this.route.snapshot.params.id;

    if (this.idPedido) {
      this.pedidoService.obtenerPedido(this.idPedido)
      .subscribe(pedido => {
        if (pedido) {
          this.setPedidoForm(pedido);
        }
      });
    } else {
      this.establecerUsuario();
    }

    this.loadGoogleMaps();

    this.breakpointObserver.observe('(max-width: 1024px)')
    .subscribe(resp => {
      console.log(resp);
      if (resp.breakpoints['(max-width: 1024px)'] === true) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    });
  }

  pedidoFormGroup(): FormGroup {
    const pedidoFormGroup =  this.fb.group({
      id: [],
      usuario: this.fb.group({
        id: []
      }),
      cliente: this.fb.group({
        id: [undefined, [Validators.required]],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        nitCI: ['', [Validators.required]],
      }),
      conServicioEntrega: [false],
      direccionEntrega: [''],
      coordenadasDireccionEntrega: this.fb.group({
        lat: [],
        lng: []
      })
      ,
      fechaEntrega: [undefined, [Validators.required]],
      detallesPedidos: this.fb.array(
        [],
        [formArraySize(), this.productosDuplicados]
      ),
      total: [0],
      estado: ['pendiente'],
      factura: this.fb.group({
        numeroFactura: [''],
        fechaEmision: [''],
        anulado: [''],
      })
    });

    return pedidoFormGroup;
  }

  loadGoogleMaps(): void {
    this.conServicioEntrega.valueChanges
      .pipe(
        mergeMap(conServicioEntrega => {
          return this.googleMapsService.apiLoaded
            .pipe(
              map(apiLoaded => {
                return { apiLoaded, conServicioEntrega };
              })
            );
        }),
      ).subscribe(resp => {
        if (resp.apiLoaded && resp.conServicioEntrega) {
          this.apiLoaded = resp.apiLoaded;
          this.changeDetectorRef.detectChanges();
          const controlDiv = document.createElement('div');
          const controlUI = document.createElement('div');
          controlUI.style.backgroundColor = '#fff';
          controlUI.style.borderRadius = '8px';
          controlUI.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.3)';
          controlUI.style.cursor = 'pointer';
          controlUI.style.width = '29px';
          controlUI.style.height = '29px';
          controlUI.style.margin = '10px';
          controlUI.title = 'Mostrar mi ubicación';
          controlUI.style.display = 'flex';
          controlUI.style.justifyContent = 'center';
          controlUI.style.alignItems = 'center';
          controlDiv.appendChild(controlUI);

          const icon = document.createElement('img');
          icon.setAttribute('src', 'assets/icons/gps_fixed.svg');
          icon.setAttribute('id', 'gps-icon');
          icon.style.height = '18px';
          controlUI.appendChild(icon);
          controlUI.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition(position => {
              this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              document.getElementById('gps-icon')
                .setAttribute('src', 'assets/icons/gps_fixed-active.svg');
            });
          });
          this.map.mapDrag.subscribe(() => {
            document.getElementById('gps-icon')
            .setAttribute('src', 'assets/icons/gps_fixed.svg');
          });
          this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM]
            .push(controlDiv);
        }
      });
  }

  addMarker(event: google.maps.MouseEvent): void {
    console.log(event.latLng.toJSON());
    this.coordenadasDireccionEntrega.setValue(event.latLng.toJSON());
  }

  productosDuplicados(formArray: FormArray): {
    productosDuplicados: boolean,
    values: { count: number, producto: Producto }[]
  } {
    const values = formArray.value;
    if (values.length > 1) {
      const dict = {};
      for (const value of values) {
        if (value.producto.id in dict) {
          ++dict[value.producto.id].count;
        } else {
          dict[value.producto.id] = { count: 1, producto: value.producto };
        }
      }
      for (const value in dict) {
        if (dict[value].count === 1) {
          delete dict[value];
        }
      }

      return Object.values(dict).length > 0 ?
        { productosDuplicados: true, values: Object.values(dict) } : null;
    } else {
      return null;
    }
  }

  abrirSeleccionarCliente(): void {
    this.selectionListDialogService.open<Cliente>({
      title: 'Seleccionar cliente',
      search: {
        placeholder: 'Nombre/Apellido/NIT/CI'
      },
      cb: (skip, take, termino) => {
        return this.clienteService
        .obtenerClientes(skip, take, termino)
        .pipe(
          map(resp => {
            const clientes = resp.clientes.map(cliente => {
              return {
                label: `${cliente.nombre} ${cliente.apellido}`,
                value: cliente
              };
            });

            return {
              values: clientes,
              total: resp.total
            };
          })
        );
      },
      customElement: this.customElement,
    })
    .pipe(takeRxJS(1))
    .subscribe(cliente => {
      if (cliente) {
        this.cliente.patchValue(cliente);
        this.direccionEntrega.setValue(cliente.direccionDomicilio);
        this.cliente.markAsDirty();
      }
    });
  }

  abrirAgregarProducto(): void {
    this.selectionListDialogService.open<Producto>({
      title: 'Agregar producto',
      search: {
        placeholder: 'Nombre del producto'
      },
      cb: (skip, take, termino) => {
        return this.productoService
        .obtenerProductos(skip, take, termino)
        .pipe(
          map(resp => {
            const productos = resp.productos.map(producto => {
              return {
                label: `${producto.nombre}`,
                value: producto
              };
            });

            return {
              values: productos,
              total: resp.total
            };
          })
        );
      }
    })
    .pipe(takeRxJS(1))
    .subscribe(producto => {
      if (producto) {
        this.agregarDetallePedido({ producto } as DetallePedido);
      }
    });
  }

  agregarDetallePedido(detallePedido: DetallePedido): void {
    const producto = detallePedido.producto;
    const detallePedidoControl = this.fb.group({
      id: detallePedido.id,
      producto: this.fb.group({
        id: [producto.id],
        nombre: [producto.nombre]
      }),
      precioUnitario: [
        detallePedido.precioUnitario ?
          detallePedido.precioUnitario : producto.precio
      ],
      cantidad: [
        detallePedido.cantidad ? detallePedido.cantidad : 0,
        [
          Validators.required,
          Validators.min(1),
          this.onlyInteger
        ]
      ],
      subtotal: [0],
    });

    // Calculamos el subtotal
    let subtotalPrevio = 0;
    detallePedidoControl.get('cantidad').valueChanges
    .pipe(
      startWith(detallePedido.cantidad ? detallePedido.cantidad : 0),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(cantidad => {
      if (cantidad) {
        const subtotal = cantidad * producto.precio;
        detallePedidoControl.get('subtotal').setValue(subtotal.toFixed(2));
        const total = this.total.value - subtotalPrevio + subtotal;
        this.total.setValue(total.toFixed(2));
        subtotalPrevio = subtotal;
      } else {
        detallePedidoControl.get('subtotal').setValue(0);
      }
    });

    this.detallesPedidos.push(detallePedidoControl);
  }

  private onlyInteger(cantidad: AbstractControl): { noInteger: boolean } {
    const value = cantidad.value;
    return value % 1 === 0 ? null : { noInteger: true };
  }

  registrarPedido(): void {
    this.cliente.markAsTouched();
    this.detallesPedidos.markAsTouched();
    if (this.pedidoForm.valid) {
      if (!this.conServicioEntrega.value) {
        this.direccionEntrega.setValue('');
        this.coordenadasDireccionEntrega.reset();
      }
      this.pedidoService.crear(this.pedidoForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(resp => {
        this.snackBarService.open(resp.mensaje);
        // is es un nuevo pedido
        if (!this.idPedido) {
          this.router.navigate(
            [`../${resp.pedido.id}`],
            { relativeTo: this.route }
          );
        }
      });
    }
  }

  actualizarPedido(): void {
    console.log(this.pedidoForm);
    if (this.pedidoForm.valid) {
      this.pedidoService.actualizar(this.pedidoForm.value)
      .subscribe(resp => {
        const facturaAnulada: boolean = this.factura.get('anulado').value;
        if (facturaAnulada) {
          this.factura.get('anulado').disable({ onlySelf: true });
        }
        this.snackBarService.open(resp.mensaje);
      });
    }
  }

 eliminarProducto(index: number): void {
    const subtotal = this.detallesPedidos
    .get(index.toString())
    .get('subtotal').value;
    const total = this.total.value - subtotal;
    this.total.setValue(total.toFixed(2));
    this.detallesPedidos.removeAt(index);
  }

  obtenerDetallePedido(index: number): AbstractControl {
    return this.detallesPedidos.get(index.toString());
  }

  resetPedidoForm(): void {
    this.detallesPedidos.clear();
    this.cliente.reset();
    this.detallesPedidos.reset();
    this.pedidoForm.reset();
    this.conServicioEntrega.setValue(false);
    this.coordenadasDireccionEntrega.reset();
    this.establecerUsuario();
  }

  establecerUsuario(): void {
    this.usuarioService.usuario
    .pipe(takeRxJS(1))
    .subscribe(usuario => {
      this.usuario.get('id').setValue(usuario.id);
    });
  }

  setPedidoForm(pedido: Pedido): void {
    console.log('setPedidoForm', pedido);
    this.pedidoForm.patchValue({
      id: pedido.id,
      usuario: pedido.usuario,
      cliente: pedido.cliente,
      conServicioEntrega: pedido.conServicioEntrega,
      coordenadasDireccionEntrega: pedido.coordenadasDireccionEntrega ?
        pedido.coordenadasDireccionEntrega : {},
      direccionEntrega: pedido.direccionEntrega,
      fechaEntrega: format(
        new Date(pedido.fechaEntrega),
        'yyyy-MM-dd\'T\'HH:mm'
      ),
      detallesPedidos: [
        [],
        [formArraySize, this.productosDuplicados]
      ],
      total: 0,
      estado: pedido.estado,
      factura: pedido.factura ? {
        numeroFactura: pedido.factura.numeroFactura,
        fechaEmision: format(
          new Date(pedido.factura.fechaEmision),
          'yyyy-MM-dd\'T\'HH:mm'
        ),
        anulado: pedido.factura.anulado
      } : {}
    });

    if (pedido.factura && pedido.factura.anulado) {
      this.factura.get('anulado').disable({ onlySelf: true });
    }

    pedido.detallesPedidos.forEach(detallePedido => {
      this.agregarDetallePedido(detallePedido);
    });
    console.log(this.pedidoForm);
    if (pedido.coordenadasDireccionEntrega &&
        pedido.coordenadasDireccionEntrega.lat &&
        pedido.coordenadasDireccionEntrega.lng) {
      this.center = {
        lat: pedido.coordenadasDireccionEntrega.lat,
        lng: pedido.coordenadasDireccionEntrega.lng
      };
    }
  }

  crearFactura(idPedido: number): void {
    const url = this.pedidoService.crearFactura(idPedido);
    window.open(url, '_blank');
  }

  anularFactura(checked: boolean): void {
    console.log('anulado', checked);
    if (checked) {
      this.messageDialogService.openDialog({
        title: 'Anular Factura',
        message: '¿Desea anular esta factura? este proceso irrebersible',
        messageDialogConfig: {
          showCancelButton: true,
          confirmButtonText: 'Si',
          confirmButtonColor: 'warn'
        }
      })
      .afterClosed()
      .subscribe(aceptado => {
        this.factura.get('anulado').setValue(aceptado);
        if (aceptado) {
          this.pedidoService.anularFactura(this.idPedido)
          .subscribe(resp => {
            this.factura.get('anulado').disable();
            this.snackBarService.open(resp.mensaje);
          });
        }
      });
    }
  }

  get usuario(): AbstractControl {
    return this.pedidoForm.get('usuario');
  }

  get cliente(): FormGroup {
    return this.pedidoForm.get('cliente') as FormGroup;
  }

  get conServicioEntrega(): AbstractControl {
    return this.pedidoForm.get('conServicioEntrega');
  }

  get coordenadasDireccionEntrega(): AbstractControl {
    return this.pedidoForm.get('coordenadasDireccionEntrega');
  }

  get direccionEntrega(): AbstractControl {
    return this.pedidoForm.get('direccionEntrega');
  }

  get detallesPedidos(): FormArray {
    return this.pedidoForm.get('detallesPedidos') as FormArray;
  }

  get fechaEntrega(): AbstractControl {
    return this.pedidoForm.get('fechaEntrega');
  }

  get factura(): AbstractControl {
    return this.pedidoForm.get('factura');
  }

  get total(): AbstractControl {
    return this.pedidoForm.get('total');
  }

  get estado(): AbstractControl {
    return this.pedidoForm.get('estado');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
