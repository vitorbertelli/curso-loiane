import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, pipe, switchMap } from 'rxjs';

// import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.scss'
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: Cursos2Service,
    private location: Location, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params["id"];
    //     console.log(id);
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map(params => params["id"]),
    //     switchMap(id => this.service.loadById(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));

    const curso = this.route.snapshot.data["curso"];

    // this.form = this.fb.group({
    //   id: [curso.id],
    //   nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    // });

    if(curso.id) {
      this.form = this.fb.group({
        id: [curso.id],
        nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
      });
    } else {
      this.form = this.fb.group({
        nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
      });
    }

  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

      let msgSuccess = "Curso criado com sucesso!";
      let msgError = "Erro ao criar curso, tente novamente!";
      if (this.form.value.id) {
        msgSuccess = "Curso atualizado com sucesso!";
        msgError = "Erro ao atualizar o curso, tente novamente!";
      }

      this.service.save(this.form.value).subscribe(
        success => {
          alert(msgSuccess);
            this.location.back();
        },
        error => alert(msgError)
      );


      // if(this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       alert("Curso atualizado com sucesso!");
      //       this.location.back();
      //     },
      //     error => {
      //       alert("Erro ao atualizar o curso, tente novamente!");
      //     }
      //   );
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       alert("Curso criado com sucesso!");
      //       this.location.back();
      //     },
      //     error => {
      //       alert("Erro ao criar curso, tente novamente!");
      //     }
      //   );
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
