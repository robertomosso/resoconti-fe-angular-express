import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuperuserComponent } from './register-superuser.component';

describe('RegisterComponent', () => {
  let component: RegisterSuperuserComponent;
  let fixture: ComponentFixture<RegisterSuperuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSuperuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSuperuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
