import { Component } from '@angular/core';

@Component({
  selector: 'app-operador-elvis',
  standalone: true,
  imports: [],
  templateUrl: './operador-elvis.component.html',
  styleUrl: './operador-elvis.component.sass'
})
export class OperadorElvisComponent {
  tarefa: any = {
    desc: 'Descrição da tarefa',
    responsavel: {
      usuario: null
    }
    //responsavel : {nome: 'Loiane'}
  };

}
