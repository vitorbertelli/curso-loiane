import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormDirective {
  
  formulario!: FormGroup;

  abstract submit(): void;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log("Formulário inválido!");
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset()
  }
}
