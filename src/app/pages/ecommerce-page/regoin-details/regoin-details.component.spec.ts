import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegoinDetailsComponent } from './regoin-details.component';

describe('RegoinDetailsComponent', () => {
  let component: RegoinDetailsComponent;
  let fixture: ComponentFixture<RegoinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegoinDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegoinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
