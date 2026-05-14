import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { BranchesInfo } from '../../../pages/ecommerce-page/branches/models/branches.model';
import { BranchesService } from '../../../pages/ecommerce-page/branches/service/branches.service';
import { ProductsService } from '../../../pages/ecommerce-page/e-products-list/service/products.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DistrictsService } from '../../../pages/ecommerce-page/districts/services/districts.service';
import { DistrictsInfo } from '../../../pages/ecommerce-page/districts/models/districts.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-branches-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.scss'
})
export class BranchesListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  branches!: BranchesInfo[];
  displayedColumns: string[] = [
    'branchName',
    //'districtName',
    'refrence1',
    'refrence2',
    'refrence3',
    'refrence4',
    'active',
    'action',
  ];

  dataSource = new MatTableDataSource<BranchesInfo>(this.branches);
  districts: DistrictsInfo[];
  orgId!: number;
  tokenObj: any;

  // isToggled
  isToggled = false;

  constructor(
    public themeService: CustomizerSettingsService,
    private _productService: ProductsService,
    private _districtService: DistrictsService,
    private _branchsService: BranchesService,
    private router: Router
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.loadBranches();
  }
  // async loadOrganiztionOrg(): Promise<void> {
  //   this._productService
  //     .loadOrganization()
  //     .then((organizationInfo: any): any => {
  //       this.orgId = organizationInfo?.data?.[0].orgId;
  //       if (this.orgId) {
  //         this.loadBranches();
  //       }
  //     })
  //     .catch((error): any => { });
  // }

  // getDistrictById() {
  //   if (this.orgId) {
  //     this._districtService
  //       .loadDistrictsById(this.selectedRegion, this.orgId)
  //       .then((organizationInfo: any): any => {
  //         this.districts = organizationInfo?.data;
  //       })
  //       .catch((error): any => { });
  //   }
  // }

  async loadBranches(): Promise<void> {
    this._branchsService
      .loadBranchess(this.orgId)
      .then((BranchesInfo: any): any => {
        this.branches = BranchesInfo?.data;
        console.log(this.branches);

        this.dataSource = new MatTableDataSource<BranchesInfo>(
          this.branches
        ); // Corrected line
      })
      .catch((error): any => {
        console.error('Error loading Branche:', error);
      });
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
