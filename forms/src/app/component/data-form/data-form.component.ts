import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Observable, distinctUntilChanged, EMPTY, map, switchMap } from 'rxjs';

import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { DropdownService } from '../../service/dropdown.service';
import { ConsultaCepService } from '../../service/consulta-cep.service';
import { VerificaEmailService } from './../../service/verifica-email.service';

import { EstadoBr } from '../../interface/estado-br';
import { Cargo } from '../../interface/cargo';
import { Tecnologia } from '../../interface/tecnologia';
import { Newsletter } from '../../interface/newsletter';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { BaseFormDirective } from '../base-form.directive';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormDebugComponent,
    HttpClientModule,
    CommonModule,
    CampoControlErroComponent,
    AsyncPipe,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  templateUrl: './data-form.component.html',
  providers: [
    DropdownService,
    ConsultaCepService,
    VerificaEmailService
  ]
})
export class DataFormComponent extends BaseFormDirective {

  estados: Observable<EstadoBr[]>;
  cargos: Cargo[];
  tecnologias: Tecnologia[];
  newsletter: Newsletter[];
  frameworks = ["Angular", "React", "Vue"];

  constructor(
    private http: HttpClient,
    private dropdownService: DropdownService,
    private capService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
    ) {
    super();
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]),
      confirmarEmail: new FormControl(null, [Validators.required, this.confirmEmail]),

      endereco: new FormGroup({
        cep: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)]),
        numero: new FormControl(null, [Validators.required]),
        complemento: new FormControl(null),
        rua: new FormControl(null, [Validators.required]),
        bairro: new FormControl(null, [Validators.required]),
        cidade: new FormControl(null, [Validators.required]),
        estado: new FormControl(null, [Validators.required])
      }),

      cargo: new FormControl(null),
      tecnologias: new FormControl(null),
      newsletter: new FormControl("sim", [Validators.required]),
      termos: new FormControl(false, [Validators.pattern('true')]),
      frameworks: this.buildFrameworks()
    });

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletter = this.dropdownService.getNewsletter();
    this.verificaEmailService.verificarEmail("").subscribe();

    this.formulario.get("endereco.cep")?.statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(
          status => status === "VALID" ?
          this.capService.consultarCep(this.formulario.get("endereco.cep")?.value) : EMPTY
        ))
      .subscribe(dados => dados ? this.popularDadosForm(dados) : {});
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return new FormArray(values, this.requiredMinCheckbox(1));
  }

  frameworksArrayControls() {
    return (this.formulario.get('frameworks') as FormArray).controls;
  }

  requiredMinCheckbox(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

  override submit(): void {
    
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v:any, i:any) => v ? this.frameworks[i] : null)
      .filter((v:any) => v !== null)
    });

    this.http.post("https://httpbin.org/post", JSON.stringify(valueSubmit))
      .pipe(map(res => res))
      .subscribe(dados => this.resetar());
  }

  verificaValidTouched(campo: string): boolean {
    return (!this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched) ?? false;
  }

  aplicaCssErro(campo: string) {
    return {
      "is-invalid": this.verificaValidTouched(campo),
    }
  }

  consultarCep() {
    const cep: string = this.formulario.get("endereco.cep")?.value;

    if (cep != null && cep !== "") {
      this.capService.consultarCep(cep)
        .subscribe(dados => {
          this.popularDadosForm(dados);
        });
    }
  }

  popularDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  setCargo() {
    const cargo = { nome: "Desenvolvedor", nivel: "Pleno", descricao: "Desenvolvedor Pleno" };
    this.formulario.get("cargo")?.setValue(cargo);
  }

  onCompare(cargo1: Cargo, cargo2: Cargo) {
    return cargo1 && cargo2 ? (cargo1.descricao === cargo2.descricao) : cargo1 === cargo2;
  }

  setTecnologias() {
    this.formulario.get("tecnologias")?.setValue(["java", "javascript"]);
  }

  confirmEmail(control: AbstractControl) {
    if(!control.root || !(<FormGroup>control.root).controls) {
      return null;
    }

    const confirmEmail = control.value;
    const email = control.root.get("email")?.value;

    if(confirmEmail !== email) {
      return { equalsTo: true };
    }

    return null;
  }

  validarEmail(control: AbstractControl) {
    return this.verificaEmailService.verificarEmail(control.value)
      .pipe(map(emailExiste => emailExiste ? { emailExiste: true } : null))
  }
}
