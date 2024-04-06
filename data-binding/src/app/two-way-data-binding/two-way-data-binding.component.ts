import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-data-binding',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './two-way-data-binding.component.html',
  styleUrl: './two-way-data-binding.component.sass'
})
export class TwoWayDataBindingComponent {
  nome: string = "abc";

  pessoa = {
    nome: "def",
    idade: 20
  }
}
