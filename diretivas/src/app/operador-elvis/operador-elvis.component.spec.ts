import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorElvisComponent } from './operador-elvis.component';

describe('OperadorElvisComponent', () => {
  let component: OperadorElvisComponent;
  let fixture: ComponentFixture<OperadorElvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadorElvisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperadorElvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
