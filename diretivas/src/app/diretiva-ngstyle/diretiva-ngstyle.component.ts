import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diretiva-ngstyle',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './diretiva-ngstyle.component.html',
  styleUrl: './diretiva-ngstyle.component.sass'
})
export class DiretivaNgstyleComponent {
  tamanhoFonte: number = 10;
  ativo: boolean = true;

  mudarAtivo() {
    this.ativo = !this.ativo;
  }
}
