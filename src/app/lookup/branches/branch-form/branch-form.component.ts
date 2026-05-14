import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { BranchesInfoDetails } from '../../../pages/ecommerce-page/branches/models/branches.model';
import { BranchesService } from '../../../pages/ecommerce-page/branches/service/branches.service';
import { DistrictsInfo } from '../../../pages/ecommerce-page/districts/models/districts.model';
import { DistrictsService } from '../../../pages/ecommerce-page/districts/services/districts.service';
import { OragnizationInfo } from '../../../pages/ecommerce-page/e-products-list/models/products.model';
import { ProductsService } from '../../../pages/ecommerce-page/e-products-list/service/products.service';
import { jwtDecode } from 'jwt-decode';
import { NgIf, CommonModule } from '@angular/common';
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
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { RegoinService } from '../../../pages/ecommerce-page/regoins/services/regoins.service';
import { RegoinInfoDetails } from '../../../pages/ecommerce-page/regoins/models/regoins.model';

@Component({
  selector: 'app-branch-form',
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
    MatDatepickerModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.scss'
})
export class BranchFormComponent {
  branchForm: FormGroup;
  isToggled = false;
  regions: RegoinInfoDetails[] = [];
  isLoading: boolean = false; // Loading indicator state
  errorMessage: string = ''; // Error message state
  branchs: BranchesInfoDetails;
  orgId: number;
  regId: number;
  id: number;
  editMode: boolean = false;
  districts: DistrictsInfo[];
  selectedRegion: any;
  tokenObj: any;

  constructor(
    public themeService: CustomizerSettingsService,
    private regoinService: RegoinService,
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
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.regId = params['regId'];
      this.editMode = (this.id != undefined) ? true : false;
      this.getbranchById();
    });

    this.getRegions();
    this.initForm();
  }

  getRegions() {
    if (this.orgId)
      this.regoinService.loadRegoinsById(this.orgId)
        .then((result: any): any => {
          this.regions = result?.data;
          if (this.regId)
            this.selectedRegion = parseInt(this.regId.toString());
          this.getDistrictById();
        })
        .catch((error): any => { });
  }

  getDistrictById() {
    if (this.orgId && this.selectedRegion) {
      this._districtService
        .loadDistrictsById(this.selectedRegion, this.orgId)
        .then((result: any): any => {
          this.districts = result?.data;
        })
        .catch((error): any => { });
    }
  }

  getbranchById() {
    if (this.orgId && this.id) {
      this._branchService
        .loadBranchessById(this.orgId, this.id)
        .then((result: any): any => {
          this.branchs = result?.data;
          this.initForm();
        })
        .catch((error): any => { });
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
      refrence1: [this.branchs?.refrence1 ?? ''],
      refrence2: [this.branchs?.refrence2 ?? ''],
      refrence3: [this.branchs?.refrence3 ?? ''],
      refrence4: [this.branchs?.refrence4 ?? ''],
      lat: [this.branchs?.lat ?? ''],
      long: [this.branchs?.long ?? ''],
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
        this.router.navigate(['/lookup/branches']);
      }, 100);
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
        this.router.navigate(['/lookup/branches']);
      }, 100);
    } catch (error) {
      this.errorMessage = 'Error adding branch. Please try again.';
    } finally {
      // Set loading to false when submission is complete (success or error)
      this.isLoading = false;
    }
  }
}
