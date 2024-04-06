import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: any[] = [];

  constructor() { }

  getCursos() {
    return [
      {"id": 1, "nome": "Angular 17"},
      {"id": 2, "nome": "TypeScript"}
    ]
  }

  getCurso(id: number) {
    this.cursos = this.getCursos();
    for(let i = 0; this.cursos.length > i; i++) {
      if(this.cursos[i].id == id) {
        return this.cursos[i];
      }
    }
  }
}
