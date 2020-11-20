import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SubmenuService } from '@services/submenu.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
  idSubmenu: number;
  submenuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submenuService: SubmenuService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.submenuForm = this.fb.group({
      nombre: ['', [Validators.required]],
      path: ['', [Validators.required]]
    });

    this.idSubmenu = this.route.snapshot.params.id;

    if (this.idSubmenu) {
      this.actualizarFormulario(this.idSubmenu);
    }
  }

  actualizarFormulario(idSubmenu: number): void {
    this.submenuService.obtenerSubmenu(idSubmenu)
    .pipe(
      take(1),
      tap(submenu => {
        this.submenuForm.patchValue(submenu);
      })
    )
    .subscribe();
  }

  actualizarSubmenu(idSubmenu: number): void {
    if (this.submenuForm.valid) {
      this.submenuService.actualizar(idSubmenu, this.submenuForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.snackBar.open(resp.mensaje, 'Hecho', { duration: 2000 });
      });
    }
  }

  crearSubmenu(): void {
    if (this.submenuForm.valid) {
      this.submenuService.crear(this.submenuForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.resetForm();
        this.snackBar.open(resp.mensaje, 'Hecho', { duration: 2000 });
      });
    }
  }

  resetForm(): void {
    this.submenuForm.reset();
  }

  get nombre(): AbstractControl {
    return this.submenuForm.get('nombre');
  }

  get path(): AbstractControl {
    return this.submenuForm.get('path');
  }
}
