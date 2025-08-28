import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaResocontiComponent } from './visualizza-resoconti.component';

describe('VisualizzaResocontiComponent', () => {
  let component: VisualizzaResocontiComponent;
  let fixture: ComponentFixture<VisualizzaResocontiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzaResocontiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaResocontiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
