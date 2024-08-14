import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';

// import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';
import { Curso } from '../curso';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cursos-lista',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: Cursos2Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          // console.log(error);
          this.error$.next(true);
          return EMPTY;
        })
      );
  }

  onEdit(id: any) {
    console.log("o botao ta funcionando")
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  onDelete(id: any) {
    const response = confirm("Voce deseja remover este curso?");
    if(response) {
      this.service.delete(id).subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          alert("Erro ao remover curso. Tente novamente mais tarde!");
        }
      );
    }
  }

}
