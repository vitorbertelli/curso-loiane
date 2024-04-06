import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngswitch',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './diretiva-ngswitch.component.html',
  styleUrl: './diretiva-ngswitch.component.sass'
})
export class DiretivaNgswitchComponent {
  aba: string = 'home';
}
