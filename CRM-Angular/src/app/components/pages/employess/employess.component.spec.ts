import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployessComponent } from './employess.component';

describe('EmployessComponent', () => {
  let component: EmployessComponent;
  let fixture: ComponentFixture<EmployessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
