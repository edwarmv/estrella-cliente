import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit, OnDestroy {
  buscadorForm: FormGroup;

  @Output() terminoChange = new EventEmitter<string>();

  @Input() placeholder = '';

  unsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: [''],
    });

    this.termino.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
    )
    .subscribe((termino: string) => {
      this.terminoChange.emit(termino);
    });
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
