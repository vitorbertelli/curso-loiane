import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent {

  formulario!: FormGroup;

  abstract submit(): void;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    }
  }

}
