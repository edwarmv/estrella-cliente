import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Rol } from '@models/rol.model';
import { RolService } from '@services/rol.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss']
})
export class AsignarRolComponent implements OnInit {
  roles$: Observable<Rol[]>;
  unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AsignarRolComponent>,
    private rolService: RolService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.termino.valueChanges
    .pipe(
      debounceTime(300),
      takeUntil(this.unsubscribe),
      startWith('')
    )
    .subscribe(termino => {
      this.roles$ = this.rolService.obtenerRoles(0, 0, termino)
      .pipe(map(resp => resp.roles));
    });
  }

  seleccionarRol(rol: Rol): void {
    this.dialogRef.close(rol);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }
}
