import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-properties',
  standalone: true,
  imports: [],
  templateUrl: './input-properties.component.html',
  styleUrl: './input-properties.component.sass'
})
export class InputPropertiesComponent {
  @Input() nome: string = '';
}
