import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserimentoResocontoComponent } from './inserimento-resoconto.component';

describe('InserimentoResocontoComponent', () => {
  let component: InserimentoResocontoComponent;
  let fixture: ComponentFixture<InserimentoResocontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserimentoResocontoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserimentoResocontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
