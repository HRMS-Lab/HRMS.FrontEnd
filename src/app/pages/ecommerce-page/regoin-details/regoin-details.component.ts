import { NgFor, NgClass, CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StarRatingComponent } from '../e-product-details/star-rating/star-rating.component';
import { RegoinsInfo } from '../regoins/models/regoins.model';
import { RegoinService } from '../regoins/services/regoins.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-regoin-details',
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
    templateUrl: './regoin-details.component.html',
    styleUrl: './regoin-details.component.scss',
})
export class RegoinDetailsComponent implements OnInit, AfterViewInit {
    id: number;
    // Star Rating
    selectedRating: number = 2;
    displayedColumns: string[] = [
        'regionName',
        'regionDescription',
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

    dataSource = new MatTableDataSource<RegoinsInfo>([]);
    orgId!: number;
    RegoinDetails!: RegoinsInfo[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.getOrgIdAndRegoinId();
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: RegoinService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    getOrgIdAndRegoinId() {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.getRegoinById();
        });
    }
    getRegoinById() {
        if (this.id) {
            this._productService
                .loadRegoinsById(this.id)
                .then((organizationInfo: any): any => {
                    this.RegoinDetails = organizationInfo?.data;
                    this.dataSource = new MatTableDataSource<RegoinsInfo>(
                        this.RegoinDetails
                    ); // Corrected line
                })
                .catch((error): any => {});
        }
    }
    goToRegoinPage(id: number, regoinId: number): void {
        this.router.navigate(['/ecommerce-page/create-regoin'], {
            queryParams: {
                id,
                regoinId,
                editMode: true,
            },
        });
    }
    goToDistrictPage(orgId: number, id: number): void {
        this.router.navigate(['/ecommerce-page/districts'], {
            queryParams: {
                orgId,
                id,
            },
        });
    }
}
