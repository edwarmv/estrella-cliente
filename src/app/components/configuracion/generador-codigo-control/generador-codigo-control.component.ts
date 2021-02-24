import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacturaService } from '@services/factura.service';
import { isntInteger, isntFloat } from '@validators/number.validator';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-generador-codigo-control',
  templateUrl: './generador-codigo-control.component.html',
  styleUrls: ['./generador-codigo-control.component.scss']
})
export class GeneradorCodigoControlComponent implements OnInit {
  codigoControlForm: FormGroup;
  codigoControl: string;

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService,
    private clipboard: Clipboard,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.codigoControlForm = this.fb.group({
      numeroAutorizacion: ['7904006306693', [Validators.required, isntInteger]],
      numeroFactura: ['876814', [Validators.required, isntInteger]],
      nitCI: ['1665979', [Validators.required, isntInteger]],
      fechaTransaccion: ['19/05/2008', [Validators.required, Validators.pattern(/^(\d{1,2}\/){2}\d{4}$/)]],
      montoTransaccion: ['35958.60', [Validators.required, isntFloat]],
      llaveDosificacion: ['zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS', Validators.required]
    });
  }

  generarCodigoControl(): void {
    console.log(this.codigoControlForm);
    if (this.codigoControlForm.valid) {
      this.facturaService.generarCodigoControl(this.codigoControlForm.value)
      .pipe(take(1))
      .subscribe(codigoControl => this.codigoControl = codigoControl);
    }
  }

  copiarCodigoControl(): void {
    this.clipboard.copy(this.codigoControl);
    this.snack.open('Copiado', '', { duration: 1500 });
  }

  limpiarFormulario(): void {
    this.codigoControlForm.reset();
  }

  get numeroAutorizacion(): AbstractControl {
    return this.codigoControlForm.get('numeroAutorizacion');
  }

  get numeroFactura(): AbstractControl {
    return this.codigoControlForm.get('numeroFactura');
  }

  get nitCI(): AbstractControl {
    return this.codigoControlForm.get('nitCI');
  }

  get fechaTransaccion(): AbstractControl {
    return this.codigoControlForm.get('fechaTransaccion');
  }

  get montoTransaccion(): AbstractControl {
    return this.codigoControlForm.get('montoTransaccion');
  }

  get llaveDosificacion(): AbstractControl {
    return this.codigoControlForm.get('llaveDosificacion');
  }
}
