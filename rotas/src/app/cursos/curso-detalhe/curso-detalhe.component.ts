import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [],
  providers: [
    CursosService
  ],
  templateUrl: './curso-detalhe.component.html',
  styleUrl: './curso-detalhe.component.css'
})
export class CursoDetalheComponent implements OnInit, OnDestroy{

  id: any;
  curso: any;
  inscricao: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private _cursosService: CursosService,
    private router: Router
    ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params["id"];
      }
    );

    this.curso = this._cursosService.getCurso(this.id);

    if(this.curso == null) {
      this.router.navigate(['/naoEncontrado']);
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
