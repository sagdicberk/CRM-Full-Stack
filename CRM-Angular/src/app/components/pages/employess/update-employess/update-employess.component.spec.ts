import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployessComponent } from './update-employess.component';

describe('UpdateEmployessComponent', () => {
  let component: UpdateEmployessComponent;
  let fixture: ComponentFixture<UpdateEmployessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEmployessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
