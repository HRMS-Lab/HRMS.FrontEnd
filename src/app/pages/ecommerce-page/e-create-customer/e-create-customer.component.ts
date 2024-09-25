import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrgChart, TitleInfo } from '../e-customers/model/titles.model';
import { TitleService } from '../e-customers/services/titles.service';
import { ProductsService } from '../e-products-list/service/products.service';
import { OragnizationInfo } from '../e-products-list/models/products.model';

@Component({
  selector: 'app-e-create-customer',
  standalone: true,
  templateUrl: './e-create-customer.component.html',
  styleUrl: './e-create-customer.component.scss',
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, MatCheckboxModule],
})
export class ECreateCustomerComponent {
  titleForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  editMode: boolean = false;
  orgId: number;
  orgChartId: number;
  id: number;
  titles: TitleInfo
  organizations: OragnizationInfo[] = [];
  orgChart: OrgChart[] = []
  constructor(
    public themeService: CustomizerSettingsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _titlesService: TitleService,
    private _productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getOrgIdAndAttechmentId();
    this.loadOrganiztionOrg()
    this.initForm();
  }
  async loadOrganiztionOrg(): Promise<void> {
    this._productService
      .loadOrganization()
      .then((organizationInfo: any): any => {
        this.organizations = organizationInfo?.data;

      })
      .catch((error: any): any => { });
  }
  async loadOrganiztionCharts(orgId:number): Promise<void> {
    this._titlesService
      .loadOrgChart(orgId)
      .then((organizationInfo: any): any => {
        this.orgChart = organizationInfo?.data;

      })
      .catch((error: any): any => { });
  }
  initForm(): void {
    this.titleForm = this.fb.group({
      titleName: [this.titles?.titleName ?? '', Validators.required],
      titleDescription: [this.titles?.titleDescription ?? '', Validators.required],
      orgId: [this.titles?.orgId ?? null, Validators.required],
      orgChartId: [this.titles?.orgChartId ?? null, Validators.required],
      refrence1: [this.titles?.refrence1 ?? '', Validators.required],
      refrence2: [this.titles?.refrence2 ?? '', Validators.required],
      refrence3: [this.titles?.refrence3 ?? ''],
      refrence4: [this.titles?.refrence4 ?? ''],
      refrence5: [this.titles?.refrence5 ?? ''],
      active: [this.titles?.active ?? true]
    });
  }

  getOrgIdAndAttechmentId(): void {
    this.route.queryParams.subscribe((params) => {
      this.orgId = params['orgId'];
      this.orgChartId = params['orgChartId'];
      this.id = params['id'];
      this.editMode = params['editMode'];
      this.loadTitleById();
    });
  }

  loadTitleById(): void {
    if (this.orgId && this.id) {
      this._titlesService.loadTitleById(this.id).then((response: any) => {
        const titleData = response?.data[0];
        this.titles = titleData;
        this.initForm()
      });
    }
  }

  onSubmit(): void {
    if (this.titleForm.valid) {
      this.isLoading = true;
      const formData = this.titleForm.value;

      if (this.editMode) {
        this.updateTitle(formData);
      } else {
        this.addTitle(formData);
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  addTitle(title: any): void {
    this._titlesService.addTitle(title).then(() => {
      this.router.navigate(['/ecommerce-page/customers']);
    }).catch(() => {
      this.errorMessage = 'Error adding Title.';
    }).finally(() => {
      this.isLoading = false;
    });
  }

  updateTitle(title: any): void {
    this._titlesService.updateTitle(this.id, title).then(() => {
      this.router.navigate(['/ecommerce-page/customers']);
    }).catch(() => {
      this.errorMessage = 'Error updating Title.';
    }).finally(() => {
      this.isLoading = false;
    });
  }
}
