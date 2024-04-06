import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  providers: [
    CursosService
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{
  cursos: any[] = [];

  constructor(private _cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursos = this._cursosService.getCursos();
  }
}
