import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-output-properties',
  standalone: true,
  imports: [],
  templateUrl: './output-properties.component.html',
  styleUrl: './output-properties.component.sass'
})
export class OutputPropertiesComponent {

  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter;

  incrementa() {
    this.valor++;
    this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa() {
    this.valor--;
    this.mudouValor.emit({novoValor: this.valor});
  }
}
