import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './diretiva-ngif.component.html',
  styleUrl: './diretiva-ngif.component.sass'
})
export class DiretivaNgifComponent {
  cursos: string[] = [];

  mostrarCursos: boolean = false;

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos;
  }
}
