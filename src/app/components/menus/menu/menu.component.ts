import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '@models/menu.model';
import { MenuService } from '@services/menu.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  idMenu: number;
  menu: Menu;
  menuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      nombre: ['', [Validators.required]],
      path: ['', [Validators.required]]
    });

    this.idMenu = this.route.snapshot.params.id;

    if (this.idMenu) {
      this.actualizarFormulario(this.idMenu);
    }
  }

  actualizarFormulario(idMenu: number): void {
    this.menuService.obtenerMenu(idMenu)
    .pipe(take(1))
    .subscribe(menu => {
        this.menu = menu;
        this.menuForm.patchValue(menu);
    });
  }

  actualizarMenu(): void {
    if (this.menuForm.valid) {
      this.menuService.actualizar(this.idMenu, this.menuForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.snackBar.open(resp.mensaje, 'Hecho', { duration: 2000 });
      });
    }
  }

  crearMenu(): void {
    console.log(this.menuForm);
    if (this.menuForm.valid) {
      this.menuService.crear(this.menuForm.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.resetForm();
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

  resetForm(): void {
    this.menuForm.reset();
  }

  get nombre(): AbstractControl {
    return this.menuForm.get('nombre');
  }
}
