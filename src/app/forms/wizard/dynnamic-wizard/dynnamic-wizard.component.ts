import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
    selector: 'app-dynnamic-wizard',
    standalone: true,
    imports: [
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule
    ],
    templateUrl: './dynnamic-wizard.component.html',
    styleUrl: './dynnamic-wizard.component.scss',
})
export class DynnamicWizardComponent {
    @Input() steps: { label: string; content: TemplateRef<any> }[] = []; // Accept steps with content (templates)
    @Output() stepChange = new EventEmitter<number>();

    // Emit step change event
    onStepChange(event: any) {
      this.stepChange.emit(event.selectedIndex);
    }

    onFinish() {
      console.log('Wizard finished');
    }
}
