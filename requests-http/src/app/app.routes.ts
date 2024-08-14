import { Routes } from '@angular/router';

import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';
import { UnsubscribePocComponent } from './unsubscribe-rxjs/unsubscribe-poc/unsubscribe-poc.component';
import { CursosFormComponent } from './cursos/cursos-form/cursos-form.component';
import { cursoResolverGuard } from './cursos/guards/curso-resolver.guard';
import { UploadFileComponent } from './upload-file/upload-file/upload-file.component';
import { LibSearchComponent } from './reactive-search/lib-search/lib-search.component';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "upload" },
  { path: "cursos", component: CursosListaComponent },
  { path: "cursos/novo", component: CursosFormComponent, resolve: { curso: cursoResolverGuard } },
  { path: "cursos/editar/:id", component: CursosFormComponent, resolve: { curso: cursoResolverGuard } },
  { path: "rxjs-poc", component: UnsubscribePocComponent },
  { path: "upload", component: UploadFileComponent },
  { path: "busca-reativa", component: LibSearchComponent }
];
