import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { OragnizationInfo } from '../e-products-list/models/products.model';
import { ProductsService } from '../e-products-list/service/products.service';
import { NgIf, CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DistrictInfoDetails } from '../districts/models/districts.model';
import { DistrictsService } from '../districts/services/districts.service';
import { RegoinsInfo } from '../regoins/models/regoins.model';
import { RegoinService } from '../regoins/services/regoins.service';

@Component({
    selector: 'app-create-district',
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
        MatDatepickerModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatTooltipModule,
        CommonModule,
    ],
    templateUrl: './create-district.component.html',
    styleUrl: './create-district.component.scss',
})
export class CreateDistrictComponent {
    DistrictForm: FormGroup;
    isToggled = false;
    organizations: OragnizationInfo[] = [];
    isLoading: boolean = false; // Loading indicator state
    errorMessage: string = ''; // Error message state
    Districts: DistrictInfoDetails;
    id: number;
    editMode: boolean = false;
    orgId: number;
    regions: RegoinsInfo[];
    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: ProductsService,
        private _DistrictService: DistrictsService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private regionsService: RegoinService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.loadOrganiztionOrg();
        this.getOrgIdAndDistrictId();
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
    getOrgIdAndDistrictId() {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.orgId = params['orgId'];
            this.editMode = params['editMode'];
            this.getDistrictById();
            this.onEmployeeChange(this.orgId);
        });
    }
    getDistrictById() {
        if (this.id && this.orgId) {
            this._DistrictService
                .loadDistrictsById(this.id, this.orgId)
                .then((organizationInfo: any): any => {
                    this.Districts = organizationInfo?.data.find((val: any) => {
                        if (val.districtId == this.id) {
                            return val;
                        }
                    });
                    this.initForm();
                })
                .catch((error): any => {});
        }
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
    onEmployeeChange(orgId: number) {
        this.regionsService
            .loadRegoinsById(orgId)
            .then((EmployeeInfo: any): any => {
                this.regions = EmployeeInfo?.data;
            })
            .catch((error): any => {
                console.error('Error loading Employee:', error);
            });
    }
    initForm() {
        this.DistrictForm = this.fb.group({
            regiond: [this.Districts?.regionId ?? this.id],
            districtName: [
                this.Districts?.districtName ?? '',
                [Validators.required],
            ],
            districtDescription: [
                this.Districts?.districtDesciption ?? '',
                [Validators.required],
            ],
            refrence1: [this.Districts?.refrence1 ?? '', [Validators.required]],
            refrence2: [this.Districts?.refrence2 ?? '', [Validators.required]],
            refrence3: [this.Districts?.refrence3 ?? ''],
            refrence4: [this.Districts?.refrence4 ?? ''],
            refrence5: [this.Districts?.refrence5 ?? ''],
            active: [this.Districts?.active ?? true],
            lat: [this.Districts?.lat ?? '', [Validators.required]],
            long: [this.Districts?.long ?? '', [Validators.required]],
            dateCreated: [this.Districts?.dateCreated ?? null],
            dateUpdated: [this.Districts?.dateUpdated ?? null],
        });
    }
    onSubmit() {
        if (this.DistrictForm.valid) {
            if (this.editMode) {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.updateDistrict();
            } else {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.addDistrict();
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }

    async addDistrict() {
        const newDistrict = this.DistrictForm.value;
        try {
            const result = await this._DistrictService.addDistrict(newDistrict);
            console.log('District added successfully:', result);

            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/districts'], {
                    queryParams: {
                        id: this.id,
                        orgId: this.orgId,
                    },
                });
            }, 2000);
        } catch (error) {
            console.error('Error adding District:', error);
            this.errorMessage = 'Error adding District. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }

    async updateDistrict() {
        const newDistrict = this.DistrictForm.value;
        try {
            const result = await this._DistrictService.updateDistrict(
                this.Districts?.districtId,
                newDistrict
            );
            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/districts'], {
                    queryParams: {
                        id: this.id,
                        orgId: this.orgId,
                    },
                });
            }, 2000);
        } catch (error) {
            this.errorMessage = 'Error adding District. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }
}
