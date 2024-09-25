import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TotalEarningsComponent } from './total-earnings/total-earnings.component';
import { TotalRefundsComponent } from './total-refunds/total-refunds.component';
import { ConversionRateComponent } from './conversion-rate/conversion-rate.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RevenueComponent } from './revenue/revenue.component';
import { ProductsComponent } from './products/products.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { OragnizationInfo, OrganizationInfo } from '../e-sellers/model/organizations.model';
import { OrganizationsService } from '../e-sellers/services/organizations.service';

@Component({
    selector: 'app-e-seller-details',
    standalone: true,
    imports: [
        MatCardModule,
        TotalOrdersComponent,
        TotalEarningsComponent,
        TotalRefundsComponent,
        ConversionRateComponent,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RevenueComponent,
        ProductsComponent,
    ],
    templateUrl: './e-seller-details.component.html',
    styleUrl: './e-seller-details.component.scss',
})
export class ESellerDetailsComponent {
    OrganizationDetails: OragnizationInfo;
    id: number;
    // Star Rating
    selectedRating: number = 2;

    // Input Counter
    value = 1;

    ngOnInit(): void {
        this.getOrgIdAndOrganizationId();
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _OrganizationService: OrganizationsService,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    getOrgIdAndOrganizationId() {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.getOrganizationById();
        });
    }
    getOrganizationById() {
        if (this.id) {
            this._OrganizationService
                .loadOrganizationsById(this.id)
                .then((organizationInfo: any): any => {
                    this.OrganizationDetails = organizationInfo?.data[0];
                })
                .catch((error): any => {});
        }
    }
}
