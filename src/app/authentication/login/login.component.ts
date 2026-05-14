import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { first } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // RouterLink, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    // MatCheckboxModule, 
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule, 
    NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // isToggled
  isToggled = false;
  submitted = false;
  errorMsg: string;
  buttonLoader = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private authService: AuthenticationService,
    public themeService: CustomizerSettingsService
  ) {
    this.loginForm = this.fb.group({
      //orginzationId: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

  // Password Hide
  hide = true;

  // Form
  loginForm: FormGroup;
  onSubmit() {
    this.buttonLoader = true;
    this.errorMsg = '';

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(first())
        .subscribe({
          next: () => {
            //this.router.navigate(['/pages']);
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigate([returnUrl]);
            this.sharedService.triggerMenuFunction();
          },
          error: error => {
            console.log(error);
            
            this.errorMsg = error;
            this.submitted = true;
            this.buttonLoader = false;
          }
        });
    } else {
      this.submitted = true;
      this.buttonLoader = false;
    }
  }
}
