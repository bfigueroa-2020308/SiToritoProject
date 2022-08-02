import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVIPComponent } from './register-vip.component';

describe('RegisterVIPComponent', () => {
  let component: RegisterVIPComponent;
  let fixture: ComponentFixture<RegisterVIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
