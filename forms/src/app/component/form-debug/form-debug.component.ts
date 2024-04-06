import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-debug',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe
  ],
  templateUrl: './form-debug.component.html',
  styleUrl: './form-debug.component.css'
})
export class FormDebugComponent {

  @Input() form: any;

}
