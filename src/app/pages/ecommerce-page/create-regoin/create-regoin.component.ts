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
import {
    RegoinInfoDetails,
    RegoinsInfo,
} from '../regoins/models/regoins.model';
import { RegoinService } from '../regoins/services/regoins.service';
import { NgIf, CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-create-regoin',
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
    templateUrl: './create-regoin.component.html',
    styleUrl: './create-regoin.component.scss',
})
export class CreateRegoinComponent {
    RegoinForm: FormGroup;
    isToggled = false;
    organizations: OragnizationInfo[] = [];
    isLoading: boolean = false; // Loading indicator state
    errorMessage: string = ''; // Error message state
    Regoins: RegoinInfoDetails;
    regoinId: number;
    id: number;
    editMode: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: ProductsService,
        private _regoinService: RegoinService,
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
        this.getOrgIdAndRegoinId();
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
    getOrgIdAndRegoinId() {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.regoinId = params['regoinId'];
            this.editMode = params['editMode'];
            this.getRegoinById();
        });
    }
    getRegoinById() {
        if (this.id) {
            this._regoinService
                .loadRegoinsById(this.id)
                .then((organizationInfo: any): any => {
                    this.Regoins = organizationInfo?.data.find((val: any) => {
                        
                        if (val.regionId == this.regoinId) {
                            return val;
                        }
                    });
                    console.log(this.Regoins, 'regoins');

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
        this.RegoinForm = this.fb.group({
            regionName: [this.Regoins?.regionName ?? '', [Validators.required]],
            regionDescription: [
                this.Regoins?.regionDescription ?? '',
                [Validators.required],
            ],
            refrence1: [this.Regoins?.refrence1 ?? '', [Validators.required]],
            refrence2: [this.Regoins?.refrence2 ?? '', [Validators.required]],
            refrence3: [this.Regoins?.refrence3 ?? ''],
            refrence4: [this.Regoins?.refrence4 ?? ''],
            refrence5: [this.Regoins?.refrence5 ?? ''],
            active: [this.Regoins?.active ?? true],
            orgId: [this.Regoins?.orgId ?? null, [Validators.required]],
            lat: [this.Regoins?.lat ?? '', [Validators.required]],
            long: [this.Regoins?.long ?? '', [Validators.required]],
            dateCreated: [this.Regoins?.dateCreated ?? null],
            lastUpdated: [this.Regoins?.lastUpdated ?? null],
        });
    }
    onSubmit() {
        if (this.RegoinForm.valid) {
            if (this.editMode) {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.updateRegoin();
            } else {
                // Set loading to true when submission starts
                this.isLoading = true;
                this.addRegoin();
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }

    async addRegoin() {
        const newRegoin = this.RegoinForm.value;
        try {
            const result = await this._regoinService.addRegoin(newRegoin);
            console.log('Regoin added successfully:', result);

            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/sellers']);
            }, 2000);
        } catch (error) {
            console.error('Error adding Regoin:', error);
            this.errorMessage = 'Error adding Regoin. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }

    async updateRegoin() {
        const newRegoin = this.RegoinForm.value;
        try {
            const result = await this._regoinService.updateRegoin(
                this.regoinId,
                newRegoin
            );
            // Navigate to the product list page on success
            setTimeout(() => {
                this.router.navigate(['/ecommerce-page/sellers']);
            }, 2000);
        } catch (error) {
            this.errorMessage = 'Error adding Regoin. Please try again.';
        } finally {
            // Set loading to false when submission is complete (success or error)
            this.isLoading = false;
        }
    }
}
