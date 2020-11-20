import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '@models/menu.model';
import { Submenu } from '@models/submenu.model';
import { MenuService } from '@services/menu.service';
import { take } from 'rxjs/operators';
import {
  SeleccionarSubmenuComponent
} from '../seleccionar-submenu/seleccionar-submenu.component';

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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      nombre: ['', [Validators.required]],
      submenus: this.fb.array([], [this.idsDuplicados])
    });

    this.idMenu = this.route.snapshot.params.id;

    if (this.idMenu) {
      this.actualizarFormulario(this.idMenu);
    }
  }

  idsDuplicados(formArray: FormArray): {idsDuplicados: boolean, values: any[]} {
    const values = formArray.value;
    if (values.length > 1) {
      const dict = {};
      for (const value of values) {
        if (value.id in dict) {
          ++dict[value.id].count;
        } else {
          dict[value.id] = {count: 1, value};
        }
      }
      for (const value in dict) {
        if (dict[value].count === 1) {
          delete dict[value];
        }
      }

      return Object.values(dict).length > 0 ?
        { idsDuplicados: true, values: Object.values(dict) } : null;
    } else {
      return null;
    }
  }

  actualizarFormulario(idMenu: number): void {
    this.menuService.obtenerMenu(idMenu)
    .pipe(take(1))
    .subscribe(menu => {
        this.menu = menu;
        this.menuForm.patchValue(menu);
        menu.submenus.forEach(submenu => this.agregarSubmenu(submenu));
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
    this.submenus.clear();
    this.menuForm.reset();
  }

  seleccionarSubmenu(): void {
    const dialogRef = this.dialog.open(SeleccionarSubmenuComponent);

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe(submenu => {
      if (submenu) {
        this.agregarSubmenu(submenu);
      }
    });
  }

  agregarSubmenu(submenu: Submenu): void {
    this.submenus.push(
      this.fb.group({
        id: [submenu.id],
        nombre: [submenu.nombre]
      })
    );
  }

  eliminarSubmenu(id: number): void {
    if (this.idMenu) {
      const submenu: Submenu = this.submenus.get(id.toString()).value;
      this.menuService.desasignarSubmenu(this.idMenu, submenu.id)
      .pipe(take(1))
      .subscribe();
    }
    this.submenus.removeAt(id);
  }

  get nombre(): AbstractControl {
    return this.menuForm.get('nombre');
  }

  get submenus(): FormArray {
    return this.menuForm.get('submenus') as FormArray;
  }
}
