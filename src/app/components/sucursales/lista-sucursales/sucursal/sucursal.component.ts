import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sucursal } from '@models/sucursal.model';
import { SnackBarService } from '@services/snack-bar.service';
import { SucursalService } from '@services/sucursal.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss'],
})
export class SucursalComponent implements OnInit {
  sucursalForm: FormGroup;
  sucursal: Sucursal;

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sucursalForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      numeroTelefono: ['', Validators.required],
      estado: [true],
    });

    const idSucursal = this.route.snapshot.params.idSucursal;

    if (idSucursal) {
      this.patchValueSucursalForm(idSucursal);
    }
  }

  patchValueSucursalForm(idSucursal: number): void {
    this.sucursalService.obtenerSucursal(idSucursal).subscribe(resp => {
      console.log(resp.value);
      if (resp.value) {
        this.sucursal = resp.value;
        this.sucursalForm.patchValue(resp.value);
      }
    });
  }

  crearSucursal(): void {
    if (this.sucursalForm.valid) {
      this.sucursalService.crear(this.sucursalForm.value).subscribe(resp => {
        this.router.navigateByUrl(`sucursales/${resp.value.id}`)
        this.snackBarService.open(resp.mensaje);
      });
    }
  }

  actualizarSucursal(): void {
    if (this.sucursalForm.valid && this.id.value) {
      this.sucursalService
        .actualizar(this.sucursalForm.value)
        .subscribe(resp => {
          this.snackBarService.open(resp.mensaje);
        });
    }
  }

  get id(): AbstractControl {
    return this.sucursalForm.get('id');
  }

  get nombre(): AbstractControl {
    return this.sucursalForm.get('nombre');
  }

  get direccion(): AbstractControl {
    return this.sucursalForm.get('direccion');
  }

  get ubicacion(): AbstractControl {
    return this.sucursalForm.get('ubicacion');
  }

  get numeroTelefono(): AbstractControl {
    return this.sucursalForm.get('numeroTelefono');
  }

  get estado(): AbstractControl {
    return this.sucursalForm.get('estado')
  }
}
