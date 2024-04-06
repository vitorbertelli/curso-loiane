import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PipesComponent } from './pipes/pipes.component';

import '@angular/common/locales/global/pt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PipesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { 
      provide: LOCALE_ID,
      useValue: 'pt' 
    }
  ]
})
export class AppComponent {
  title = 'pipes';
}
