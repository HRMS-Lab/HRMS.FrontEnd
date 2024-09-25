import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegoinComponent } from './create-regoin.component';

describe('CreateRegoinComponent', () => {
  let component: CreateRegoinComponent;
  let fixture: ComponentFixture<CreateRegoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRegoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
