import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
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
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { EmployeeInfo, TitlesInfo } from '../e-orders/models/employee.model';
import { EmployeeService } from '../e-orders/services/employee.service';
import {
    DepartmentInfo,
    OragnizationInfo,
} from '../e-products-list/models/products.model';
import { ProductsService } from '../e-products-list/service/products.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { HorizontalComponent } from '../../../forms/wizard/horizontal/horizontal.component';
import { DynnamicWizardComponent } from '../../../forms/wizard/dynnamic-wizard/dynnamic-wizard.component';

@Component({
    selector: 'app-e-create-order',
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
        CommonModule,
        MatCheckboxModule,
        MatOptionModule,
        MatExpansionModule,DynnamicWizardComponent
    ],
    templateUrl: './e-create-order.component.html',
    styleUrl: './e-create-order.component.scss',
})
export class ECreateOrderComponent {
    employeeForm: FormGroup;
    organizations: OragnizationInfo[] = [];
    departments!: DepartmentInfo[];
    titles!: TitlesInfo[];
    isToggled = false;
    isLoading: boolean = false; // Loading indicator state
    errorMessage: string = ''; // Error message state
    employees: EmployeeInfo;
    orgId: number;
    id: number;
    editMode: boolean = false;
    wizardSteps: any[] = [];

    get employeeName() {
        return this.employeeForm.get('employeeName');
    }
    get employeeDescription() {
        return this.employeeForm.get('employeeDescription');
    }

    get refrence1() {
        return this.employeeForm.get('refrence1');
    }

    get refrence2() {
        return this.employeeForm.get('refrence2');
    }

    get refrence3() {
        return this.employeeForm.get('refrence3');
    }

    get refrence4() {
        return this.employeeForm.get('refrence4');
    }

    get refrence5() {
        return this.employeeForm.get('refrence5');
    }
    @ViewChild('step1Content') step1Content!: TemplateRef<any>;
    @ViewChild('step2Content') step2Content!: TemplateRef<any>;
    constructor(
        public themeService: CustomizerSettingsService,
        private _employeeService: EmployeeService,
        private _productService: ProductsService,

        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.loadOrganiztionOrg();
        this.getOrgIdAndemployeeId();
        this.loadTitles();
        this.initForm();
        this.wizardSteps = [
            { label: 'Create Employee', content: this.step1Content },
            { label: 'Create Attachment', content: this.step2Content },
            // { label: 'Create Attachment', content: this.step2Content },
          ];
    }
    async loadOrganiztionOrg(): Promise<void> {
        this._productService
            .loadOrganization()
            .then((organizationInfo: any): any => {
                this.organizations = organizationInfo?.data;
                this.orgId = organizationInfo?.data?.[0].orgId;
                if (this.orgId) {
                    this.loadDepartments();
                }
            })
            .catch((error): any => {});
    }
    async loadDepartments(): Promise<void> {
        this._productService
            .loadDepartments(this.orgId)
            .then((departmentInfo: any): any => {
                this.departments = departmentInfo?.data;
            })
            .catch((error): any => {
                console.error('Error loading Department:', error);
            });
    }
    async loadTitles(): Promise<void> {
        this._employeeService
            .loadTitles()
            .then((titlesInfo: any): any => {
                this.titles = titlesInfo?.data;
            })
            .catch((error): any => {
                console.error('Error loading Tiltes:', error);
            });
    }
    getOrgIdAndemployeeId() {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.editMode = params['editMode'];
            this.getemployeeById();
        });
    }
    getemployeeById() {
        if (this.orgId && this.id) {
            this._employeeService
                .loadEmployeesById(this.id)
                .then((organizationInfo: any): any => {
                    this.employees = organizationInfo?.data[0];
                    this.initForm();
                })
                .catch((error): any => {});
        }
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
    initForm() {
        this.employeeForm = this.fb.group({
            fullName: [this.employees?.fullName ?? '', [Validators.required]],
            email: [
                this.employees?.email ?? '',
                [Validators.required, Validators.email],
            ],
            phone: [
                this.employees?.phone ?? null,
                [Validators.required, this.phoneNumberValidator],
            ],
            nationalId: [
                this.employees?.nationalId ?? null,
                [Validators.required, this.nationalIdValidator],
            ],
            hireDate: [this.employees?.hireDate ?? '', [Validators.required]],
            birthDate: [this.employees?.birthDate ?? '', [Validators.required]],
            departmentId: [
                this.employees?.departmentId ?? null,
                [Validators.required],
            ],
            orgId: [this.employees?.orgId ?? null, [Validators.required]],
            titleId: [this.employees?.titleId ?? null, [Validators.required]],
            bankAccount: [
                this.employees?.bankAccount ?? '',
                [Validators.required],
            ],
            bankName: [this.employees?.bankName ?? '', [Validators.required]],
            refrence1: [this.employees?.refrence1 ?? ''],
            refrence2: [this.employees?.refrence2 ?? '' ],
            refrence3: [this.employees?.refrence3 ?? ''],
            refrence4: [this.employees?.refrence4 ?? ''],
            refrence5: [this.employees?.refrence5 ?? ''],
            refrence6: [this.employees?.refrence6 ?? ''],
            refrence7: [this.employees?.refrence7 ?? ''],
            refrence8: [this.employees?.refrence8 ?? ''],
            refrence9: [this.employees?.refrence9 ?? ''],
            refrence10: [this.employees?.refrence10 ?? ''],
            active: [this.employees?.active ?? true],
        });
    }
    // Custom validator for account number (12 digits)
    accountNumberValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const isValid = /^[0-9]{12}$/.test(control.value);
        return isValid ? null : { invalidAccountNumber: true };
    }

    // Custom validator for national ID (12 numbers)
    nationalIdValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const isValid = /^[0-9]{14}$/.test(control.value);
        return isValid ? null : { invalidNationalId: true };
    }

    // Custom validator for phone number (basic validation)
    phoneNumberValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const isValid = /^[0-9]{10,15}$/.test(control.value); // Adjust regex as needed for phone validation
        return isValid ? null : { invalidPhoneNumber: true };
    }
    getFieldType(key: string): string {
        switch (key) {
            case 'hireDate':
            case 'birthDate':
                return 'date';
            case 'accountNumber':
                return 'number';
            case 'nationalId':
                return 'text';
            // Define other types accordingly...
            default:
                return 'text';
        }
    }

    onSubmit() {
        if (this.employeeForm.valid) {
            if (this.editMode) {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.updateemployee();
            } else {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.addemployee();
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }

    async addemployee() {
        const newemployee = this.employeeForm.value;
        try {
            const result = await this._employeeService.addEmployee(newemployee);
            console.log('employee added successfully:', result);

            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/orders']);
            }, 2000);
        } catch (error) {
            console.error('Error adding employee:', error);
            this.errorMessage = 'Error adding employee. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }
    getInfoFields() {
        return [
            {
                name: 'fullName',
                label: 'Full Name',
                type: 'input',
                placeholder: 'Enter Full Name',
                inputType: 'text',
            },
            {
                name: 'email',
                label: 'Email',
                type: 'input',
                placeholder: 'Enter Email',
                inputType: 'email',
            },
            {
                name: 'phone',
                label: 'Phone',
                type: 'input',
                placeholder: 'Enter Phone Number',
                inputType: 'tel',
            },
            {
                name: 'nationalId',
                label: 'National ID',
                type: 'input',
                placeholder: 'Enter National ID',
                inputType: 'text',
            },
            {
                name: 'hireDate',
                label: 'Hire Date',
                type: 'date',
                placeholder: 'Select Hire Date',
            },
            {
                name: 'birthDate',
                label: 'Birth Date',
                type: 'date',
                placeholder: 'Select Birth Date',
            },
            {
                name: 'departmentId',
                label: 'Department',
                type: 'select',
                options: this.departments.map((d) => ({
                    value: d.departmentId,
                    label: d.departmentName,
                })),
            },
            {
                name: 'orgId',
                label: 'Organization',
                type: 'select',
                options: this.organizations.map((o) => ({
                    value: o.orgId,
                    label: o.orgName,
                })),
            },
            {
                name: 'titleId',
                label: 'Title',
                type: 'select',
                options: this.titles.map((t) => ({
                    value: t.titleId,
                    label: t.titleName,
                })),
            },
            {
                name: 'bankAccount',
                label: 'Bank Account',
                type: 'input',
                placeholder: 'Enter Bank Account',
                inputType: 'text',
            },
            {
                name: 'bankName',
                label: 'Bank Name',
                type: 'input',
                placeholder: 'Enter Bank Name',
                inputType: 'text',
            },
            {
                name: 'refrence1',
                label: 'Reference 1',
                type: 'input',
                placeholder: 'Enter Reference 1',
                inputType: 'text',
            },
            // Add other references if needed
            { name: 'active', label: 'Active', type: 'checkbox' },
        ];
    }
    async updateemployee() {
        const newemployee = this.employeeForm.value;
        try {
            const result = await this._employeeService.updateEmployee(
                this.employees?.employeeId,
                newemployee
            );
            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/orders']);
            }, 2000);
        } catch (error) {
            this.errorMessage = 'Error adding employee. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }

      onStepChange(stepIndex: number) {
        console.log('Current step:', stepIndex);
      }
}
