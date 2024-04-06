import { Component } from '@angular/core';
import { FundoAmareloDirective } from '../fundo-amarelo.directive';
import { HighlightMouseDirective } from '../highlight-mouse.directive';
import { HighlightDirective } from '../highlight.directive';

@Component({
  selector: 'app-diretiva-diretivas-customizadas',
  standalone: true,
  imports: [
    FundoAmareloDirective,
    HighlightMouseDirective,
    HighlightDirective
  ],
  templateUrl: './diretiva-diretivas-customizadas.component.html',
  styleUrl: './diretiva-diretivas-customizadas.component.sass'
})
export class DiretivaDiretivasCustomizadasComponent {

}
