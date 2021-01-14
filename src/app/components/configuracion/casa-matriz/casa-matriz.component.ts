import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CasaMatrizService } from '@services/casa-matriz.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-empresa',
  templateUrl: './casa-matriz.component.html',
  styleUrls: ['./casa-matriz.component.scss']
})
export class CasaMatrizComponent implements OnInit {
  casaMatrizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private casaMatrizService: CasaMatrizService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.casaMatrizForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcionActividadEconomica: ['', Validators.required],
      numeroTelefono: ['', Validators.required],
      correoElectronico: [''],
      nit: ['', Validators.required],
      logotipo: ['']
    });

    this.casaMatrizService.obtenerCasaMatriz()
    .pipe(take(1))
    .subscribe(casaMatriz => {
      this.casaMatrizForm.setValue(casaMatriz);
    });
  }

  actualizarCasaMatriz(): void {
    console.log(this.casaMatrizForm);
    if (this.casaMatrizForm.valid) {
      this.casaMatrizService.actualizar(this.casaMatrizForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.snack.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

  get nombre(): AbstractControl {
    return this.casaMatrizForm.get('nombre');
  }

  get ubicacion(): AbstractControl {
    return this.casaMatrizForm.get('ubicacion');
  }

  get direccion(): AbstractControl {
    return this.casaMatrizForm.get('direccion');
  }

  get descripcionActividadEconomica(): AbstractControl {
    return this.casaMatrizForm.get('descripcionActividadEconomica');
  }

  get numeroTelefono(): AbstractControl {
    return this.casaMatrizForm.get('numeroTelefono');
  }

  get correoElectronico(): AbstractControl {
    return this.casaMatrizForm.get('correoElectronico');
  }

  get nit(): AbstractControl {
    return this.casaMatrizForm.get('nit');
  }
}
