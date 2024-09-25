import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { OrganizationsService } from '../e-sellers/services/organizations.service';
import { OragnizationInfo } from '../e-sellers/model/organizations.model';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-e-create-seller',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgxEditorModule,
        MatCheckboxModule,
        FormsModule,
        MatOptionModule,
        RouterLink,
        CommonModule
    ],

    templateUrl: './e-create-seller.component.html',
    styleUrl: './e-create-seller.component.scss',
})
export class ECreateSellerComponent {
    OrganizationForm: FormGroup;
    isLoading: boolean = false;
    errorMessage: string = '';
    editMode: boolean = false;
    orgId: number;
    id: number;
    orgs: OragnizationInfo;
    constructor(
        public themeService: CustomizerSettingsService,
        private _OrganizationService: OrganizationsService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getOrgIdAndOrganizationId();
        this.initForm();
    }

    initForm(): void {
        this.OrganizationForm = this.fb.group({
            orgId: [this.orgs?.orgId ?? 0],
            orgName: [this.orgs?.orgName ?? '', Validators.required],
            orgDescription: [this.orgs?.orgDescription ?? '', Validators.required],
            employeeIdstartedFrom: [this.orgs?.employeeIdstartedFrom ?? ''],
            logo: [this.orgs?.logo ?? null], // Add Validators if necessary
            nofLicense: [this.orgs?.nofLicense ?? ''],
            employeeIdlastId: [this.orgs?.employeeIdlastId ?? ''],
            active: [this.orgs?.active ?? true],
            refrence1: [this.orgs?.refrence1 ?? ''],
            refrence2: [this.orgs?.refrence2 ?? ''],
            refrence3: [this.orgs?.refrence3 ?? ''],
            refrence4: [this.orgs?.refrence4 ?? ''],
            refrence5: [this.orgs?.refrence5 ?? ''],
            licenseStartDate: [this.orgs?.licenseStartDate ?? ''],
            licenseEndDate: [this.orgs?.licenseEndDate ?? ''],
        });
    }
    
    getOrgIdAndOrganizationId(): void {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.editMode = params['editMode'];
            this.getOrganizationById();
        });
    }

    getOrganizationById(): void {
        if (this.orgId && this.id) {
            this._OrganizationService
                .loadOrganizationsById(this.id)
                .then((response: any) => {
                    const Organization = response?.data[0];
                    this.orgs = Organization;
                    this.initForm();
                });
        }
    }
    onSubmit(): void {
        if (this.OrganizationForm.valid) {
            this.isLoading = true;
            const formControls = this.OrganizationForm.controls;
            const formData = {
                orgId: formControls['orgId'].value,
                orgName: formControls['orgName'].value,
                orgDescription: formControls['orgDescription'].value,
                employeeIdlastId: formControls['employeeIdlastId'].value,
                nofLicense: formControls['nofLicense'].value,
                employeeIdstartedFrom: formControls['employeeIdstartedFrom'].value,
                active: formControls['active'].value,
                refrence1: formControls['refrence1'].value,
                refrence2: formControls['refrence2'].value,
                refrence3: formControls['refrence3'].value,
                refrence4: formControls['refrence4'].value,
                refrence5: formControls['refrence5'].value,
                licenseStartDate: formControls['licenseStartDate'].value,
                licenseEndDate: formControls['licenseEndDate'].value,
                logo: [[]], // Initialize logo array
            };
    
            const logoFileList = formControls['logo'].value;
    
            // Convert FileList to Array<File> and process the files
            if (logoFileList && logoFileList.length > 0) {
                const logoArray = Array.from(logoFileList) as File[]; // Cast to File[] 
                const base64Promises = logoArray
                    .filter((file: File) => file instanceof File)
                    .map((file: File) => this.convertToBase64(file));
    
                Promise.all(base64Promises).then((base64Files: any[]) => {
                    formData.logo = base64Files;
    
                    // Submit the form as JSON
                    this.submitForm(formData);
                });
            } else {
                // No files, submit the form as JSON
                this.submitForm(formData);
            }
        } else {
            this.errorMessage = 'Please fill in all required fields.';
        }
    }
    

    submitForm(formData: any): void {
        if (this.editMode) {
            this.updateOrganization(formData);
        } else {
            this.addOrganization(formData);
        }
    }

    // Convert a file to Base64
    convertToBase64(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // Base64 encoded string
            reader.onerror = (error) => reject(error);
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length) {
            console.log(input.files,'sara hanem');
            
            const file = input.files;
            // You can add more validation here if needed
            this.OrganizationForm.patchValue({
                logo: file
            });
            // If you need to upload the file immediately or process it further
        }
    }
    

    addOrganization(Organization: any): void {
        this._OrganizationService
            .addOrganization(Organization)
            .then(() => {
                this.router.navigate(['/ecommerce-page/sellers']);
            })
            .catch((error) => {
                this.errorMessage = 'Error adding Organization.';
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    updateOrganization(Organization: any): void {
        this._OrganizationService
            .updateOrganization(this.id, Organization)
            .then(() => {
                this.router.navigate(['/ecommerce-page/sellers']);
            })
            .catch((error) => {
                this.errorMessage = 'Error updating Organization.';
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}
