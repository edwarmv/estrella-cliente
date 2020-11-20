import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Menu } from '@models/menu.model';
import { MenuService } from '@services/menu.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-menu',
  templateUrl: './seleccionar-menu.component.html',
  styleUrls: ['./seleccionar-menu.component.scss']
})
export class SeleccionarMenuComponent implements OnInit {
  menus$: Observable<Menu[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SeleccionarMenuComponent>,
    private menuService: MenuService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      startWith('')
    )
    .subscribe(termino => {
      this.menus$ = this.menuService.obtenerMenus(0, 0, termino)
      .pipe(map(resp => resp.menus));
    });
  }

  seleccionarMenu(menu: Menu): void {
    this.dialogRef.close(menu);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
