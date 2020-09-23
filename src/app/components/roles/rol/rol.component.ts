import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { Observable } from 'rxjs';
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

    this.rol$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.rolService
        .obtenerRol(Number.parseInt(params.get('id'), 10));
      }),
      tap(rol => {
        if (rol) {
          this.rolForm.patchValue(rol);
        }
      })
    );
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
    .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  guardarCambios(id: number): void {
    this.rolService.actualiarRol(id, this.rolForm.value)
    .subscribe(resp => {
      this.snackBar.open('Rol actualizado', 'Hecho', { duration: 2000 });
    });
  }

}
