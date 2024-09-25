import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { EmployeeService } from '../e-orders/services/employee.service';
import { RegoinService } from '../regoins/services/regoins.service';
import { AdressesService } from '../adresses/services/adresses.service';
import { AddressInfo } from 'net';
import {
    AdressesInfo,
    AdressesInfoPayload,
} from '../adresses/models/adresses.model';

@Component({
    selector: 'app-create-adress',
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
    templateUrl: './create-adress.component.html',
    styleUrl: './create-adress.component.scss',
})
export class CreateAdressComponent implements OnInit {
    AddressForm: FormGroup;
    isToggled = false;
    employees: any[] = [];
    regions: any[] = [];
    isLoading: boolean = false;
    errorMessage: string = '';
    addressId: number;
    editMode: boolean = false;
    addresses: AdressesInfo;
    constructor(
        public themeService: CustomizerSettingsService,
        private addressService: AdressesService,
        private employeeService: EmployeeService,
        private regoinService: RegoinService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.loadEmployees();
        this.getOrgIdAndAdressId();
        this.initForm();
    }
    getOrgIdAndAdressId() {
        this.route.queryParams.subscribe((params) => {
            // this.id = params['id'];
            this.addressId = params['id'];
            this.editMode = params['editMode'];
            this.getAdressById();
        });
    }
    getAdressById() {
        if (this.addressId) {
            this.regoinService
                .loadRegoinsById(this.addressId)
                .then((organizationInfo: any): any => {
                    this.addresses = organizationInfo?.data.find((val: any) => {
                        if (val.addressId == this.addressId) {
                            return val;
                        }
                    });

                    this.initForm();
                })
                .catch((error): any => {});
        }
    }
    loadEmployees() {
        this.employeeService
            .loadEmployees()
            .then((EmployeeInfo: any): any => {
                console.log('in emlotesee', EmployeeInfo);
                this.employees = EmployeeInfo?.data;
            })
            .catch((error): any => {
                console.error('Error loading Employee:', error);
            });
    }

    onEmployeeChange(orgId: number) {
        this.regoinService
            .loadRegoinsById(orgId)
            .then((EmployeeInfo: any): any => {
                this.regions = EmployeeInfo?.data;
            })
            .catch((error): any => {
                console.error('Error loading Employee:', error);
            });
    }

    initForm() {
        this.AddressForm = this.fb.group({
            employeeId: [
                this.addresses?.employeeId ?? null,
                [Validators.required],
            ],
            address1: [this.addresses?.address1 ?? '', [Validators.required]],
            regionId: [this.addresses?.regionId ?? null],
            city: [this.addresses?.city ?? '', [Validators.required]],
            state: [this.addresses?.state ?? '', [Validators.required]],
            zipCode: [this.addresses?.zipCode ?? '', [Validators.required]],
            refrence1: [this.addresses?.refrence1 ?? ''],
            refrence2: [this.addresses?.refrence2 ?? ''],
            refrence3: [this.addresses?.refrence3 ?? ''],
            refrence4: [this.addresses?.refrence4 ?? ''],
            refrence5: [this.addresses?.refrence5 ?? ''],
            active: [this.addresses?.active ?? true],
        });
    }

    onSubmit() {
        if (this.AddressForm.valid) {
            this.isLoading = true;
            if (this.editMode) {
                this.updateAddress();
            } else {
                this.addAddress();
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }

    async addAddress() {
        const newAddress = this.AddressForm.value;
        try {
            const result = await this.addressService.addAdress(newAddress);
            console.log('Address added successfully:', result);
            this.router.navigate(['/address-list']);
        } catch (error) {
            console.error('Error adding address:', error);
            this.errorMessage = 'Error adding address. Please try again.';
        } finally {
            this.isLoading = false;
        }
    }

    async updateAddress() {
        const updatedAddress = this.AddressForm.value;
        try {
            const result = await this.addressService.updateAdress(
                this.addressId,
                updatedAddress
            );
            console.log('Address updated successfully:', result);
            this.router.navigate(['/address-list']);
        } catch (error) {
            console.error('Error updating address:', error);
            this.errorMessage = 'Error updating address. Please try again.';
        } finally {
            this.isLoading = false;
        }
    }
}
