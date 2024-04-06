import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwoWayDataBindingComponent } from './two-way-data-binding/two-way-data-binding.component';
import { InputPropertiesComponent } from './input-properties/input-properties.component';
import { OutputPropertiesComponent } from './output-properties/output-properties.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TwoWayDataBindingComponent,
    InputPropertiesComponent,
    OutputPropertiesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Data Binding';

  onMudouValor(evento: any) {
    console.log(evento.novoValor)
  }
}
