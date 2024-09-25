import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdressComponent } from './create-adress.component';

describe('CreateAdressComponent', () => {
  let component: CreateAdressComponent;
  let fixture: ComponentFixture<CreateAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
