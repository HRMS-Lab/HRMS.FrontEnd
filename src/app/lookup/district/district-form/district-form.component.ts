import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { DistrictInfoDetails } from '../../../pages/ecommerce-page/districts/models/districts.model';
import { DistrictsService } from '../../../pages/ecommerce-page/districts/services/districts.service';
import { OragnizationInfo } from '../../../pages/ecommerce-page/e-products-list/models/products.model';
import { ProductsService } from '../../../pages/ecommerce-page/e-products-list/service/products.service';
import { RegoinsInfo } from '../../../pages/ecommerce-page/regoins/models/regoins.model';
import { RegoinService } from '../../../pages/ecommerce-page/regoins/services/regoins.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { jwtDecode } from 'jwt-decode';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-district-form',
  standalone: true,
  imports: [
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatOptionModule,
    // MatDatepickerModule
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
  templateUrl: './district-form.component.html',
  styleUrl: './district-form.component.scss'
})
export class DistrictFormComponent {
  DistrictForm: FormGroup;
  isToggled = false;
  //organizations: OragnizationInfo[] = [];
  isLoading: boolean = false; // Loading indicator state
  errorMessage: string = ''; // Error message state
  Districts: DistrictInfoDetails;
  regId: number;
  editMode: boolean = false;
  id: number;
  orgId: number;
  regions: RegoinsInfo[];
  tokenObj: any;

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
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }
    //this.loadOrganiztionOrg();
    this.getOrgIdAndDistrictId();
    this.initForm();
  }
  // async loadOrganiztionOrg(): Promise<void> {
  //   this._productService
  //     .loadOrganization()
  //     .then((organizationInfo: any): any => {
  //       this.organizations = organizationInfo?.data;
  //     })
  //     .catch((error): any => { });
  // }
  getOrgIdAndDistrictId() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.regId = params['regId'];
      //this.orgId = params['orgId'];
      this.editMode = (this.id != undefined) ? true : false;
      this.getDistrictById();
      this.onEmployeeChange(this.orgId);
    });
  }
  getDistrictById() {
    if (this.id && this.orgId) {
      this._DistrictService
        .loadDistrictsById(this.regId, this.orgId)
        .then((result: any): any => {
          this.Districts = result?.data.find((val: any) => {
            if (val.districtId == this.id) {
              return val;
            }
          });
          this.initForm();
        })
        .catch((error): any => { });
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
      regionId: [this.Districts?.regionId ?? this.regId,
        [Validators.required]],
      districtName: [
        this.Districts?.districtName ?? '',
        [Validators.required],
      ],
      districtDescription: [
        this.Districts?.districtDescription ?? '',
        [Validators.required],
      ],
      refrence1: [this.Districts?.refrence1 ?? ''],
      refrence2: [this.Districts?.refrence2 ?? ''],
      refrence3: [this.Districts?.refrence3 ?? ''],
      refrence4: [this.Districts?.refrence4 ?? ''],
      refrence5: [this.Districts?.refrence5 ?? ''],
      active: [this.Districts?.active ?? true],
      lat: [this.Districts?.lat ?? ''],
      long: [this.Districts?.long ?? ''],
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
        this.router.navigate(['/lookup/district/district-list', this.regId]);
      }, 100);
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
        this.router.navigate(['/lookup/district/district-list', this.regId]);
      }, 100);
    } catch (error) {
      this.errorMessage = 'Error adding District. Please try again.';
    } finally {
      // Set loading to false when submission is complete (success or error)
      this.isLoading = false;
    }
  }
}
