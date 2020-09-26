import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  rol$: Observable<Rol>;

  rolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['']
    });

    const id = this.route.snapshot.params.id;

    if (id) {
      this.rol$ = this.rolService.obtenerRol(id).pipe(
        tap(rol => {
          this.rolForm.patchValue(rol);
        })
      );
    }
  }

  guardarCambios(id: number): void {
    this.rolService.actualiarRol(id, this.rolForm.value)
    .subscribe(resp => {
      this.snackBar.open('Rol actualizado', 'Hecho', { duration: 2000 });
    });
  }

  crearRol(): void {
    this.rolService.crearRol(this.rolForm.value)
    .subscribe(resp => {
      this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
    });
  }
}
