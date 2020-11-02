import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  rol: Rol;
  idRol: number;
  rolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['']
    });

    this.idRol = this.route.snapshot.params.id;

    if (this.idRol) {
      this.actualizarFormulario(this.idRol);
    }
  }

  actualizarFormulario(idRol: number): void {
    this.rolService.obtenerRol(idRol)
    .pipe(
      take(1),
      tap(rol => {
        this.rolForm.patchValue(rol);
      })
    )
    .subscribe(rol => this.rol = rol);
  }

  guardarCambios(id: number): void {
    this.rolService.actualiarRol(id, this.rolForm.value)
    .subscribe(() => {
      this.actualizarFormulario(this.idRol);
      this.snackBar.open('Rol actualizado', 'Hecho', { duration: 2000 });
    });
  }

  crearRol(): void {
    this.rolService.crearRol(this.rolForm.value)
    .subscribe(resp => {
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }

  get nombre(): AbstractControl {
    return this.rolForm.get('nombre');
  }
}
