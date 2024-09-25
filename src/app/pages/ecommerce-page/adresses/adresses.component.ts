import { NgFor, NgClass, CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, ActivatedRoute ,Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StarRatingComponent } from '../e-product-details/star-rating/star-rating.component';
import { AdressesInfo } from './models/adresses.model';
import { AdressesService } from './services/adresses.service';


@Component({
  selector: 'app-adresses',
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
  templateUrl: './adresses.component.html',
  styleUrl: './adresses.component.scss'
})
export class AdressesComponent {
  id: number;
    // Star Rating
    selectedRating: number = 2;
    displayedColumns: string[] = [
        'adressName',
        'adressDescription',
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

    dataSource = new MatTableDataSource<AdressesInfo>([]);
    orgId!: number;
    RegoinDetails!: AdressesInfo[];

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
        private _productService: AdressesService,
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
            this.orgId = params['orgId'];
            this.getRegoinById();
        });
    }
    getRegoinById() {
        if (this.orgId &&this.id) {
            this._productService
                .loadAAdresssById(this.orgId,this.id)
                .then((organizationInfo: any): any => {
                    this.RegoinDetails = organizationInfo?.data;
                    this.dataSource = new MatTableDataSource<AdressesInfo>(
                        this.RegoinDetails
                    ); // Corrected line
                })
                .catch((error): any => {});
        }
    }
    goToRegoinPage(id: number, regoinId: number): void {
        this.router.navigate(['/ecommerce-page/create-adress'], {
            queryParams: {
                id,
                regoinId,
                editMode: true,
            },
        });
    }
}
