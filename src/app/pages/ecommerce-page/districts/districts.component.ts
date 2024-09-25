import { NgFor, NgClass, CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StarRatingComponent } from '../e-product-details/star-rating/star-rating.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { DistrictsInfo } from './models/districts.model';
import { DistrictsService } from './services/districts.service';

@Component({
    selector: 'app-districts',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        CarouselModule,
        NgFor,
        NgClass,
        FormsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        StarRatingComponent,
        MatProgressBarModule,
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
    ],
    templateUrl: './districts.component.html',
    styleUrl: './districts.component.scss',
})
export class DistrictsComponent {
    id: number;
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
        'dateCreated',
        'lastUpdated',
        'action',
    ];

    dataSource = new MatTableDataSource<DistrictsInfo>([]);
    orgId!: number;
    DistrictDetails!: DistrictsInfo[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
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
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.orgId = params['orgId'];
            this.getDistrictById();
        });
    }
    getDistrictById() {
        if (this.id && this.orgId) {
            this._productService
                .loadDistrictsById(this.id, this.orgId)
                .then((organizationInfo: any): any => {
                    this.DistrictDetails = organizationInfo?.data;
                    this.dataSource = new MatTableDataSource<DistrictsInfo>(
                        this.DistrictDetails
                    ); // Corrected line
                })
                .catch((error): any => {});
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
                id: this.id,
                orgId: this.orgId,
            },
        });
    }
}
