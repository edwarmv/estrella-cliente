import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Submenu } from '@models/submenu.model';
import { SubmenuService } from '@services/submenu.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-submenu',
  templateUrl: './seleccionar-submenu.component.html',
  styleUrls: ['./seleccionar-submenu.component.scss']
})
export class SeleccionarSubmenuComponent implements OnInit {
  submenus$: Observable<Submenu[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SeleccionarSubmenuComponent>,
    private submenuService: SubmenuService,
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
      this.submenus$ = this.submenuService.submenusNoAsignados(0, 0, termino)
      .pipe(map(resp => resp.submenus));
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  seleccionarSubmenu(submenu: Submenu): void {
    this.dialogRef.close(submenu);
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
