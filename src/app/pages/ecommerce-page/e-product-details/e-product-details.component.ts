import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { DepartmentInfoDetails } from '../e-products-list/models/products.model';
import { ProductsService } from '../e-products-list/service/products.service';

@Component({
    selector: 'app-e-product-details',
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
        CommonModule
    ],
    templateUrl: './e-product-details.component.html',
    styleUrl: './e-product-details.component.scss',
})
export class EProductDetailsComponent implements OnInit {
    departmentDetails: DepartmentInfoDetails;
    orgId: number;
    id: number;
    // Star Rating
    selectedRating: number = 2;

    // Input Counter
    value = 1;


    ngOnInit(): void {
        this.getOrgIdAndDepartmentId();
    }
   
    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: ProductsService,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    getOrgIdAndDepartmentId() {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.getDepartmentById();
        });
    }
    getDepartmentById() {
        if (this.orgId && this.id) {
            this._productService
                .loadDepartmentsById(this.orgId, this.id)
                .then((organizationInfo: any): any => {
                    this.departmentDetails = organizationInfo?.data[0];
                })
                .catch((error): any => {});
        }
    }
}
