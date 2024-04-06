import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaDiretivasCustomizadasComponent } from './diretiva-diretivas-customizadas.component';

describe('DiretivaDiretivasCustomizadasComponent', () => {
  let component: DiretivaDiretivasCustomizadasComponent;
  let fixture: ComponentFixture<DiretivaDiretivasCustomizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiretivaDiretivasCustomizadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiretivaDiretivasCustomizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
