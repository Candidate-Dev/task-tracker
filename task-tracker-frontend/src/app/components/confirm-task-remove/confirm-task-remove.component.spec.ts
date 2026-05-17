import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTaskRemoveComponent } from './confirm-task-remove.component';

describe('ConfirmTaskRemoveComponent', () => {
  let component: ConfirmTaskRemoveComponent;
  let fixture: ComponentFixture<ConfirmTaskRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmTaskRemoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTaskRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
