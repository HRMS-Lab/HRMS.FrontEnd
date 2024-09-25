import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AttechmentService } from '../e-categories/service/attechment.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeService } from '../e-orders/services/employee.service';
import { AttachmentInfo } from '../e-categories/model/attechment.model';
import { ProductsService } from '../e-products-list/service/products.service';
import { EmployeeInfo } from '../e-orders/models/employee.model';

@Component({
    selector: 'app-e-create-category',
    standalone: true,
    templateUrl: './e-create-category.component.html',
    styleUrl: './e-create-category.component.scss',
    imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule, MatCheckboxModule],

})
export class ECreateCategoryComponent {
    attechmentForm: FormGroup;
    isLoading: boolean = false;
    errorMessage: string = '';
    editMode: boolean = false;
    orgId: number;
    id: number;
    employees: EmployeeInfo[] = [];
    attechmentsTypes: any[] = [];
    attachments: AttachmentInfo;
    constructor(
        public themeService: CustomizerSettingsService,
        private _attechmentService: AttechmentService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _employeeService: EmployeeService,
        private _productService: ProductsService
    ) { }

    ngOnInit(): void {
        this.loadOrganiztionOrg();
        this.getOrgIdAndAttechmentId();
        this.loadEmployees();
        this.initForm()
    }
    async loadEmployees(): Promise<void> {
        this._employeeService
            .loadEmployees()
            .then((EmployeeInfo: any): any => {
                this.employees = EmployeeInfo?.data;
            })
            .catch((error): any => {
                console.error('Error loading Employee:', error);
            });
    }
    async loadOrganiztionOrg(): Promise<void> {
        this._productService
            .loadOrganization()
            .then((organizationInfo: any): any => {
                this.orgId = organizationInfo?.data?.[0].orgId;
                if (this.orgId) {
                    this.loadAttechment();
                }
            })
            .catch((error: any): any => { });
    }
    async loadAttechment(): Promise<void> {
        this._attechmentService
            .loadAttachmemtsTypes(this.orgId)
            .then((AttachmentInfo: any): any => {
                this.attechmentsTypes = AttachmentInfo?.data;

            })
            .catch((error: any): any => {
                console.error('Error loading Department:', error);
            });
    }
    initForm(): void {
        this.attechmentForm = this.fb.group({
            attachTypeID: [this.attachments?.attachTypeID ?? null, Validators.required],
            employeeId: [this.attachments?.employeeId ?? null, Validators.required],
            attachments: [this.attachments?.attachmnts ?? null],
            active: [this.attachments?.active
                ?? true],
            refrence1: [this.attachments?.refrence1 ?? null, Validators.required],
            refrence2: [this.attachments?.refrence2 ?? null, Validators.required],
            refrence3: [this.attachments?.refrence3 ?? null],
            refrence4: [this.attachments?.refrence4 ?? null],
            refrence5: [this.attachments?.refrence5 ?? null],
            dateCreated: [this.attachments?.dateCreated ?? null],
            lastUpdated: [this.attachments?.lastUpdated ?? null]
        });
    }

    getOrgIdAndAttechmentId(): void {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.editMode = params['editMode'];
            this.getAttechmentById();
        });
    }

    getAttechmentById(): void {        
        if (this.orgId && this.id) {
            this._attechmentService.loadAttachmemtsById(this.orgId, this.id).then((response: any) => {
                const Attechment = response?.data[0];
                this.attachments = Attechment
                this.initForm()
            });
        }
    }
    onSubmit(): void {
        if (this.attechmentForm.valid) {
            this.isLoading = true;
            const formControls = this.attechmentForm.controls;

            const formData = {
                attachTypeID: formControls['attachTypeID'].value,
                employeeId: formControls['employeeId'].value,
                active: formControls['active'].value,
                refrence1: formControls['refrence1'].value,
                refrence2: formControls['refrence2'].value,
                refrence3: formControls['refrence3'].value,
                refrence4: formControls['refrence4'].value,
                refrence5: formControls['refrence5'].value,
                dateCreated: formControls['dateCreated'].value,
                lastUpdated: formControls['lastUpdated'].value,
                attachments: [[]] // Add attachments as base64 strings here if needed
            };

            // Convert file to Base64 and push to the formData attachments
            const attachments = formControls['attachments'].value;
            if (attachments && attachments.length > 0) {
                const base64Promises = attachments
                    .filter((file: any) => file instanceof File)
                    .map((file: File) => this.convertToBase64(file));

                Promise.all(base64Promises).then((base64Files: any[]) => {
                    formData.attachments = base64Files;

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
            this.updateAttechment(formData);
        } else {
            this.addAttechment(formData);
        }
    }

    // Convert a file to Base64
    convertToBase64(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);  // Base64 encoded string
            reader.onerror = error => reject(error);
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const filesArray: File[] = Array.from(input.files);
            this.attechmentForm.patchValue({
                attachments: filesArray
            });
        }
    }





    addAttechment(Attechment: any): void {
        this._attechmentService.addAttachmemt(Attechment).then(() => {
            this.router.navigate(['/ecommerce-page/categories']);
        }).catch((error) => {
            this.errorMessage = 'Error adding Attechment.';
        }).finally(() => {
            this.isLoading = false;
        });
    }

    updateAttechment(Attechment: any): void {
        this._attechmentService.updateAttachmemt(this.id, Attechment).then(() => {
            this.router.navigate(['/ecommerce-page/categories']);
        }).catch((error) => {
            this.errorMessage = 'Error updating Attechment.';
        }).finally(() => {
            this.isLoading = false;
        });
    }
}
