import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { DistrictsInfo } from '../../../pages/ecommerce-page/districts/models/districts.model';
import { DistrictsService } from '../../../pages/ecommerce-page/districts/services/districts.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { jwtDecode } from 'jwt-decode';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-district-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './district-list.component.html',
  styleUrl: './district-list.component.scss'
})
export class DistrictListComponent {
  regId: number;
  // Star Rating
  selectedRating: number = 2;
  displayedColumns: string[] = [
    'districtName',
    'districtDescription',
    'refrence1',
    'refrence2',
    'refrence3',
    'refrence4',
    'refrence5',
    'active',
    'action',
  ];

  dataSource = new MatTableDataSource<DistrictsInfo>([]);
  orgId!: number;
  DistrictDetails!: DistrictsInfo[];
  tokenObj: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null){
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.getOrgIdAndDistrictId();
  }

  // isToggled
  isToggled = false;

  constructor(
    public themeService: CustomizerSettingsService,
    private _productService: DistrictsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  getOrgIdAndDistrictId() {
    this.route.params.subscribe((params) => {
      debugger
      this.regId = params['regId'];
      //this.orgId = params['orgId'];
      this.getDistrictById();
    });
  }
  getDistrictById() {
    if (this.regId && this.orgId) {
      this._productService
        .loadDistrictsById(this.regId, this.orgId)
        .then((organizationInfo: any): any => {
          this.DistrictDetails = organizationInfo?.data;
          this.dataSource = new MatTableDataSource<DistrictsInfo>(
            this.DistrictDetails
          ); // Corrected line
        })
        .catch((error): any => { });
    }
  }
  goToDistrictPage(id: number): void {
    this.router.navigate(['/ecommerce-page/create-district'], {
      queryParams: {
        id,
        orgId: this.orgId,
        editMode: true,
      },
    });
  }
  gotToDistrictCreate(): void {
    this.router.navigate(['/ecommerce-page/create-district'], {
      queryParams: {
        id: this.regId,
        orgId: this.orgId,
      },
    });
  }
}
