import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EstadoBr } from '../interface/estado-br';
import { Cargo } from '../interface/cargo';
import { Tecnologia } from '../interface/tecnologia';
import { Newsletter } from '../interface/newsletter';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  
  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCargos(): Cargo[] {
    return [
      { nome: "Desenvolvedor", nivel: "Júnior", descricao: "Desenvolvedor Júnior" },
      { nome: "Desenvolvedor", nivel: "Pleno", descricao: "Desenvolvedor Pleno" },
      { nome: "Desenvolvedor", nivel: "Senior", descricao: "Desenvolvedor Senior" }
    ]
  }

  getTecnologias(): Tecnologia[] {
    return [
      { nome: "java", descricao: "Java" },
      { nome: "javascript", descricao: "JavaScript" },
      { nome: "python", descricao: "Python" }
    ]
  }

  getNewsletter(): Newsletter[] {
    return [
      { nome: "sim", descricao: "Sim" },
      { nome: "nao", descricao: "Não" },
    ]
  }
}
