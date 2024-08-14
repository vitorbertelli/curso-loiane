import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'error-msg',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent {

  // @Input() msgErro: string = "";
  // @Input() mostrarErro: boolean = false;

  @Input() control: FormControl = new FormControl;
  @Input() label: string = ""; 

  get errorMessage(): string | void {
    for(const propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
  }

  getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: {[key: string]: string} = {
      "required": `${fieldName} é obrigatório.`,
      "minlength": `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      "maxlength": `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      "pattern": `${fieldName} inválido.`
    };

    return config[validatorName];
  }
}
