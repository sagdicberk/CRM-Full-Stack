import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmployessComponent } from './delete-employess.component';

describe('DeleteEmployessComponent', () => {
  let component: DeleteEmployessComponent;
  let fixture: ComponentFixture<DeleteEmployessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEmployessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEmployessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
