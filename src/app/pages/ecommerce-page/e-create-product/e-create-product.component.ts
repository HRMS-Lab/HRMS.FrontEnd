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
import {
    ActivatedRoute,
    Route,
    Router,
    RouterLink,
    Routes,
} from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProductsService } from '../e-products-list/service/products.service';
import {
    DepartmentInfo,
    DepartmentInfoDetails,
    DepartmentInfoPayload,
    OragnizationInfo,
} from '../e-products-list/models/products.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-e-create-product',
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
    ],
    templateUrl: './e-create-product.component.html',
    styleUrl: './e-create-product.component.scss',
})
export class ECreateProductComponent {
    departmentForm: FormGroup;
    isToggled = false;
    organizations: OragnizationInfo[] = [];
    isLoading: boolean = false; // Loading indicator state
    errorMessage: string = ''; // Error message state
    departments: DepartmentInfoDetails;
    orgId: number;
    id: number;
    editMode: boolean = false;
    get departmentName() {
        return this.departmentForm.get('departmentName');
    }
    get departmentDescription() {
        return this.departmentForm.get('departmentDescription');
    }

    get refrence1() {
        return this.departmentForm.get('refrence1');
    }

    get refrence2() {
        return this.departmentForm.get('refrence2');
    }

    get refrence3() {
        return this.departmentForm.get('refrence3');
    }

    get refrence4() {
        return this.departmentForm.get('refrence4');
    }

    get refrence5() {
        return this.departmentForm.get('refrence5');
    }

    constructor(
        public themeService: CustomizerSettingsService,
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
        this.getOrgIdAndDepartmentId();
        this.initForm();
    }
    async loadOrganiztionOrg(): Promise<void> {
        this._productService
            .loadOrganization()
            .then((organizationInfo: any): any => {
                this.organizations = organizationInfo?.data;
            })
            .catch((error): any => {});
    }
    getOrgIdAndDepartmentId() {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.editMode = params['editMode'];
            this.getDepartmentById();
        });
    }
    getDepartmentById() {
        if (this.orgId && this.id) {
            this._productService
                .loadDepartmentsById(this.orgId, this.id)
                .then((organizationInfo: any): any => {
                    this.departments = organizationInfo?.data[0];
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
        this.departmentForm = this.fb.group({
            departmentName: [
                this.departments?.departmentName ?? '',
                [Validators.required],
            ],
            departmentDescription: [
                this.departments?.departmentDescription ?? '',
                [Validators.required],
            ],
            refrence1: [
                this.departments?.refrence1 ?? '',
                [Validators.required],
            ],
            refrence2: [
                this.departments?.refrence2 ?? '',
                [Validators.required],
            ],
            refrence3: [this.departments?.refrence3 ?? ''],
            refrence4: [this.departments?.refrence4 ?? ''],
            refrence5: [this.departments?.refrence5 ?? ''],
            active: [this.departments?.active ?? true],
            orgId: [this.departments?.orgId ?? null, [Validators.required]],
        });
    }
    onSubmit() {
        if (this.departmentForm.valid) {
            if (this.editMode) {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.updateDepartment();
            } else {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.addDepartment();
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }

    async addDepartment() {
        const newDepartment = this.departmentForm.value;
        try {
            const result = await this._productService.addDepartment(
                newDepartment
            );
            console.log('Department added successfully:', result);

            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/products-list']);
            }, 2000);
        } catch (error) {
            console.error('Error adding department:', error);
            this.errorMessage = 'Error adding department. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }

    async updateDepartment() {
        const newDepartment = this.departmentForm.value;
        try {
            const result = await this._productService.updateDepartment(
                this.departments?.departmentId,
                newDepartment
            );
            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/products-list']);
            }, 2000);
        } catch (error) {
            this.errorMessage = 'Error adding department. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }
}
