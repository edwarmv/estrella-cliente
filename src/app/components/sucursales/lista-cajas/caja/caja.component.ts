import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Caja } from '@models/caja.model';
import { Sucursal } from '@models/sucursal.model';
import { CajaService } from '@services/caja.service';
import { SnackBarService } from '@services/snack-bar.service';
import { SucursalService } from '@services/sucursal.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
})
export class CajaComponent implements OnInit {
  cajaForm: FormGroup;
  caja: Caja;

  constructor(
    private fb: FormBuilder,
    private cajaService: CajaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private selectionListDialogService: SelectionListDialogService,
    private sucursalService: SucursalService
  ) {}

  ngOnInit(): void {
    this.cajaForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: [true],
      sucursal: this.fb.group({
        id: [],
        nombre: ['', Validators.required],
      }),
    });

    const idCaja = this.route.snapshot.params.idCaja;

    if (idCaja) {
      this.patchValueCajaForm(idCaja);
    }
  }

  patchValueCajaForm(idCaja: number): void {
    this.cajaService.obtenerCaja(idCaja).subscribe(resp => {
      this.caja = resp.value;
      this.cajaForm.patchValue(resp.value);
    });
  }

  crearCaja(): void {
    if (this.cajaForm.valid) {
      this.cajaService.crear(this.cajaForm.value).subscribe(resp => {
        this.router.navigate(['sucursales', 'lista-cajas', resp.value.id]);
        this.snackBarService.open(resp.mensaje);
      });
    }
  }

  actualizarCaja(): void {
    if (this.cajaForm.valid) {
      this.cajaService
        .actualizar(this.caja.id, this.cajaForm.value)
        .subscribe(resp => {
          this.snackBarService.open(resp.mensaje);
        });
    }
  }

  seleccionarSucursal(): void {
    this.selectionListDialogService
      .open<Sucursal>({
        title: 'Seleccionar sucursal',
        search: { placeholder: 'Nombre sucursal' },
        cb: (skip, take, termino) =>
          this.sucursalService.obtenerSucursales({ skip, take, termino }).pipe(
            map(resp => ({
              values: resp.values.map(sucursal => ({
                label: sucursal.nombre,
                value: sucursal,
              })),
              total: resp.total,
            }))
          ),
      })
      .subscribe(sucursal => {
        if (sucursal) {
          this.asignarSucursal(sucursal);
        }
      });
  }

  asignarSucursal(sucursal: Sucursal): void {
    this.sucursal.patchValue(sucursal);
  }

  get nombre(): AbstractControl {
    return this.cajaForm.get('nombre');
  }

  get sucursal(): AbstractControl {
    return this.cajaForm.get('sucursal');
  }
}
