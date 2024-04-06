import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CamelCasePipe } from '../camel-case.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    UpperCasePipe,
    LowerCasePipe,
    JsonPipe,
    DecimalPipe,
    CamelCasePipe,
    FormsModule,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css'
})
export class PipesComponent {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  };

  livros: string[] = ["O Atlas da Terra Média", "A Queda de Gondolin", "Os Filhos de Húrin"]

  filtro: string = "";

  addLivro(livro: string) {
    this.livros.push(livro);
  } 

  getLivros() {
    if(this.livros.length === 0 || this.filtro === undefined ||
      this.filtro.trim() === "") {
      return this.livros;
    }

    return this.livros.filter(
      v => v.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Valor assíncrono"), 2000)
  });

}
