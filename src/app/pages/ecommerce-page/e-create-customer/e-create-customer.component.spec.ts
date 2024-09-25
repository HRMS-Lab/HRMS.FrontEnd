import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECreateCustomerComponent } from './e-create-customer.component';

describe('ECreateCustomerComponent', () => {
  let component: ECreateCustomerComponent;
  let fixture: ComponentFixture<ECreateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ECreateCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
