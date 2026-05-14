import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';

import { NgFor, NgClass, CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatDialog } from '@angular/material/dialog';
import { StarRatingComponent } from '../../../pages/ecommerce-page/e-product-details/star-rating/star-rating.component';
import { Region, RegionServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { RegoinsInfo } from '../../../pages/ecommerce-page/regoins/models/regoins.model';
import { HttpService } from '../../../shared/http/http.service';
import { ClientService } from '../../../shared/services/client.service';
import { catchError, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegoinService } from '../../../pages/ecommerce-page/regoins/services/regoins.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-region-list',
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
  providers: [
    RegionServiceProxy,
  ],
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.scss'
})
export class RegionListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clientService = inject(ClientService);
  httpService = inject(HttpService);
  _regoinService = inject(RegoinService);
  private _snackBar = inject(MatSnackBar);
  //regionService = inject(RegionServiceProxy);
  private toastrService = inject(ToastrService)

  baseUrl = '/Region/GetRegion/1';
  regionList: Region[];

  displayedColumns: string[] = [
    'regionName',
    'regionDescription',
    'refrence1',
    'refrence2',
    'refrence3',
    'refrence4',
    'refrence5',
    'active',
    'action',
  ];
  dataSource = new MatTableDataSource<RegoinsInfo>([]);
  tokenObj: any;

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null)
      this.tokenObj = jwtDecode(token);
    this.getRegoinById();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRegoinById() {
    this._regoinService
      .loadRegoinsById(this.tokenObj.OrganizationID)
      .then((organizationInfo: any): any => {
        this.dataSource = new MatTableDataSource<RegoinsInfo>(
          organizationInfo?.data
        ); // Corrected line
      })
      .catch((error): any => {
        this.toastrService.error(error, '', {
          timeOut: 3000,
        });
       });
  }

  get() {
    this.clientService.get(this.baseUrl).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res.data;
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err, '', {
          timeOut: 3000,
        });
      }
    });
  }

  // getRegionByOrgID(orgID: number): Observable<Region[]> {
  //   return this.regionService.getRegion(orgID).pipe(
  //     map((regions: Region[]) => {
  //       // Process the data if necessary
  //       return regions;
  //     }),
  //     catchError(error => {
  //       console.error("Error fetching regions:", error);
  //       throw error; // Or handle the error as needed
  //     })
  //   );
  // };

  // getRegoin() {
  //   this.getRegionByOrgID(1).subscribe({
  //     next: (result) => {
  //       console.log(result);

  //       this.regionList = result;
  //     }
  //   }
  //   );
  // }

  goToRegoinPage(id: number, regoinId: number): void {

  }
  goToDistrictPage(orgId: number, id: number): void {

  }
}

