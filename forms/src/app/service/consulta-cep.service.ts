import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultarCep(cep: string) {
    cep = `${cep}`.replace(/\D/g, "");

    const validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
      return this.http.get(`//viacep.com.br/ws/${cep}/json`);
    }

    return of({});
  }

}
