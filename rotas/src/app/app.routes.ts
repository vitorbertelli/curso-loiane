import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoFormComponent } from './alunos/aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './alunos/aluno-detalhe/aluno-detalhe.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cursos", component: CursosComponent },
  { path: "curso/:id", component: CursoDetalheComponent },
  { path: "login", component: LoginComponent },
  { path: "naoEncontrado", component: CursoNaoEncontradoComponent },
  { path: "alunos", component: AlunosComponent, children: [
    { path: "novo", component: AlunoFormComponent },
    { path: ":id", component: AlunoDetalheComponent },
    { path: ":id/editar", component: AlunoDetalheComponent }
  ]}
];
