import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviarValorService } from '../enviar-valor.service';
import { PocComponent } from '../components/poc.component';
import { PocUnsubComponent } from '../components/poc-unsub.component';
import { PocAsyncComponent } from '../components/poc-async.component';
import { PocTakeComponent } from '../components/poc-take.component';
import { PocTakeUntilComponent } from '../components/poc-take-until.component';

@Component({
  selector: 'app-unsubscribe-poc',
  standalone: true,
  imports: [
    CommonModule,
    PocComponent,
    PocUnsubComponent,
    PocAsyncComponent,
    PocTakeComponent,
    PocTakeUntilComponent
  ],
  templateUrl: './unsubscribe-poc.component.html',
  styleUrl: './unsubscribe-poc.component.scss'
})
export class UnsubscribePocComponent implements OnInit {

  mostrarComponentes = true;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

  emitirValor(valor: string) {
    this.service.emitirValor(valor);
  }

  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }

}
