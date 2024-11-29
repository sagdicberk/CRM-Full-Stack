import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployessComponent } from './create-employess.component';

describe('CreateEmployessComponent', () => {
  let component: CreateEmployessComponent;
  let fixture: ComponentFixture<CreateEmployessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
