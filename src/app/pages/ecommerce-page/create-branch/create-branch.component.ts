import { Component } from '@angular/core';
import { BranchesService } from '../branches/service/branches.service';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { OragnizationInfo } from '../e-products-list/models/products.model';
import { ProductsService } from '../e-products-list/service/products.service';
import { BranchesInfoDetails } from '../branches/models/branches.model';
import { CommonModule } from '@angular/common';
import { DistrictsInfo } from '../districts/models/districts.model';
import { DistrictsService } from '../districts/services/districts.service';

@Component({
    selector: 'app-create-branch',
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
        CommonModule,
    ],
    templateUrl: './create-branch.component.html',
    styleUrl: './create-branch.component.scss',
})
export class CreateBranchComponent {
    branchForm: FormGroup;
    isToggled = false;
    organizations: OragnizationInfo[] = [];
    isLoading: boolean = false; // Loading indicator state
    errorMessage: string = ''; // Error message state
    branchs: BranchesInfoDetails;
    orgId: number;
    id: number;
    editMode: boolean = false;
    districts: DistrictsInfo[];
    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: ProductsService,
        private _branchService: BranchesService,
        private _districtService: DistrictsService,
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
        this.getOrgIdAndbranchId();
        this.getDistrictById()
        this.initForm();
    }
    getDistrictById() {
        if ( this.orgId) {
            this._districtService
                .loadDistrictsById(1, this.orgId)
                .then((organizationInfo: any): any => {
                    this.districts = organizationInfo?.data;
                })
                .catch((error): any => {});
        }
    }
    async loadOrganiztionOrg(): Promise<void> {
        this._productService
            .loadOrganization()
            .then((organizationInfo: any): any => {
                this.organizations = organizationInfo?.data;
            })
            .catch((error): any => {});
    }
    getOrgIdAndbranchId() {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.editMode = params['editMode'];
            this.getbranchById();
        });
    }
    getbranchById() {
        if (this.orgId && this.id) {
            this._branchService
                .loadBranchessById(this.orgId, this.id)
                .then((organizationInfo: any): any => {
                    this.branchs = organizationInfo?.data[0];
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
        this.branchForm = this.fb.group({
            districtId: [
                this.branchs?.districtId ?? null,
                [Validators.required],
            ],
            branchName: [this.branchs?.branchName ?? '', [Validators.required]],
            refrence1: [this.branchs?.refrence1 ?? '', [Validators.required]],
            refrence2: [this.branchs?.refrence2 ?? '', [Validators.required]],
            refrence3: [this.branchs?.refrence3 ?? ''],
            refrence4: [this.branchs?.refrence4 ?? ''],
            lat: [this.branchs?.lat ?? '', [Validators.required]],
            long: [this.branchs?.long ?? '', [Validators.required]],
            active: [this.branchs?.active ?? true],
        });
    }

    onSubmit() {
        if (this.branchForm.valid) {
            if (this.editMode) {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.updatebranch();
            } else {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.addbranch();
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }

    async addbranch() {
        const newbranch = this.branchForm.value;
        try {
            const result = await this._branchService.addBranches(newbranch);
            console.log('branch added successfully:', result);

            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/branches']);
            }, 2000);
        } catch (error) {
            console.error('Error adding branch:', error);
            this.errorMessage = 'Error adding branch. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }

    async updatebranch() {
        const newbranch = this.branchForm.value;
        try {
            const result = await this._branchService.updateBranches(
                this.branchs?.branchId,
                newbranch
            );
            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/branches']);
            }, 2000);
        } catch (error) {
            this.errorMessage = 'Error adding branch. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }
}
