import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TitleInfo } from '../e-customers/model/titles.model';
import { TitleService } from '../e-customers/services/titles.service';

@Component({
    selector: 'app-e-customer-details',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './e-customer-details.component.html',
    styleUrl: './e-customer-details.component.scss'
})
export class ECustomerDetailsComponent {
   titleDetails:TitleInfo;
    orgId: number;
    id: number;
    // Star Rating
    selectedRating: number = 2;

    // Input Counter
    value = 1;

    ngOnInit(): void {
        this.getOrgIdAndEmployeeId();
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _titleService:TitleService,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    getOrgIdAndEmployeeId() {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.getEmployeeById();
        });
    }
    getEmployeeById() {
        if (this.orgId && this.id) {
            this._titleService
                .loadTitleById(this.id)
                .then((organizationInfo: any): any => {
                    this.titleDetails = organizationInfo?.data[0];
                })
                .catch((error): any => {});
        }
    }
}
