import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { DropdownService } from '../../service/dropdown.service';
import { EstadoBr } from '../../interface/estado-br';
import { ConsultaCepService } from '../../service/consulta-cep.service';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormDebugComponent,
    HttpClientModule,
    CommonModule,
    CampoControlErroComponent,
    AsyncPipe
  ],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css',
  providers: [
    DropdownService,
    ConsultaCepService
  ]
})
export class DataFormComponent {

  formulario: FormGroup;
  estados: Observable<EstadoBr[]>;

  constructor(
    private http: HttpClient,
    private dropdownService: DropdownService,
    private capService: ConsultaCepService
    ) {
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      endereco: new FormGroup({
        cep: new FormControl(null, [Validators.required]),
        numero: new FormControl(null, [Validators.required]),
        complemento: new FormControl(null),
        rua: new FormControl(null, [Validators.required]),
        bairro: new FormControl(null, [Validators.required]),
        cidade: new FormControl(null, [Validators.required]),
        estado: new FormControl(null, [Validators.required])
      }),
    });

    this.estados = this.dropdownService.getEstadosBr();
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);

      this.http.post("https://httpbin.org/post", JSON.stringify(this.formulario.value))
        .pipe(map(res => res))
        .subscribe(dados => {
          console.log(dados);
          this.resetar();
        });
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

  // resetaDadosForm() {
  //   this.formulario.patchValue({
  //     endereco: {
  //       rua: null,
  //       bairro: null,
  //       cidade: null,
  //       estado: null
  //     }
  //   });
  // }

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

}
