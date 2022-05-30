import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '@models/menu.model';
import { MenuService } from '@services/menu.service';
import { RolService } from '@services/rol.service';
import { SelectionListDialogService } from '@shared/selection-list-dialog/selection-list-dialog.service';
import { map, take as takeRxJS, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
})
export class RolComponent implements OnInit {
  idRol: number;
  rolForm: FormGroup;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private selectionListDialogService: SelectionListDialogService
  ) {}

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      rolesMenus: this.fb.array([], [this.idsDuplicados]),
    });

    this.idRol = this.route.snapshot.params.id;

    if (this.idRol) {
      this.actualizarFormulario(this.idRol);
    }
  }

  idsDuplicados(formArray: FormArray): {
    idsDuplicados: boolean;
    values: any[];
  } {
    const values: any[] = formArray.value;
    if (values.length > 1) {
      const dict = {};
      for (const value of values) {
        if (value.menu.id in dict) {
          ++dict[value.menu.id].count;
        } else {
          dict[value.menu.id] = { count: 1, nombre: value.menu.nombre };
        }
      }
      for (const value in dict) {
        if (dict[value].count === 1) {
          delete dict[value];
        }
      }

      return Object.values(dict).length > 0
        ? { idsDuplicados: true, values: Object.values(dict) }
        : null;
    } else {
      return null;
    }
  }

  actualizarFormulario(idRol: number): void {
    this.rolService
      .obtenerRol(idRol)
      .pipe(
        takeRxJS(1),
        tap(rol => {
          this.rolForm.patchValue(rol);
          rol.rolesMenus.forEach(rolMenu => {
            if (rolMenu.menu) {
              this.asignarMenu(rolMenu.menu);
            }
          });
        })
      )
      .subscribe();
  }

  resetForm(): void {
    this.rolesMenus.clear();
    this.rolForm.reset();
  }

  actualizarRol(): void {
    if (this.rolForm.valid) {
      this.rolService
        .actualiarRol(this.idRol, this.rolForm.value)
        .pipe(takeRxJS(1))
        .subscribe(() => {
          this.snackBar.open('Rol actualizado', 'Hecho', { duration: 2000 });
        });
    }
  }

  crearRol(): void {
    if (this.rolForm.valid) {
      this.rolService.crearRol(this.rolForm.value).subscribe(resp => {
        this.resetForm();
        this.snackBar.open(resp.mensaje, 'Aceptar', { duration: 2000 });
      });
    }
  }

  seleccionarMenu(): void {
    this.selectionListDialogService
      .open<Menu>({
        title: 'Seleccionar menú',
        search: { placeholder: 'Nombre del menú' },
        cb: (skip, take, termino) => {
          return this.menuService.obtenerMenus(skip, take, termino).pipe(
            map(resp => {
              const values = resp.menus.map(menu => {
                return { label: menu.nombre, value: menu };
              });
              return { values, total: resp.total };
            })
          );
        },
      })
      .subscribe(menu => {
        if (menu) {
          this.asignarMenu(menu);
        }
      });
  }

  asignarMenu(menu: Menu): void {
    const rolMenu = this.fb.group({
      menu: this.fb.group({
        id: [menu.id],
        nombre: [menu.nombre],
      }),
    });

    this.rolesMenus.push(rolMenu);
  }

  eliminarMenu(id: number): void {
    this.rolesMenus.removeAt(id);
  }

  get nombre(): AbstractControl {
    return this.rolForm.get('nombre');
  }

  get rolesMenus(): FormArray {
    return this.rolForm.get('rolesMenus') as FormArray;
  }
}
