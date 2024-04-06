import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControlErroComponent } from './campo-control-erro.component';

describe('CampoControlErroCamponent', () => {
  let camponent: CampoControlErroComponent;
  let fixture: ComponentFixture<CampoControlErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampoControlErroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampoControlErroComponent);
    camponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(camponent).toBeTruthy();
  });
});
