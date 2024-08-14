import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class cursoResolverGuard implements Resolve<Curso> {
  
  constructor(private cursoService: CursosService) {  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Curso> | Observable<any> {
    
    if(route.params && route.params["id"]) {
      return this.cursoService.loadById(route.params["id"]);
    }

    return of({
      id: null,
      nome: null
    });
    
  }
};
