import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynnamicWizardComponent } from './dynnamic-wizard.component';

describe('DynnamicWizardComponent', () => {
  let component: DynnamicWizardComponent;
  let fixture: ComponentFixture<DynnamicWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynnamicWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynnamicWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
