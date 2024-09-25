import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { EmployeeService } from '../e-orders/services/employee.service';
import { EmployeeInfo } from '../e-orders/models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-e-order-details',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        CommonModule,
    ],
    templateUrl: './e-order-details.component.html',
    styleUrl: './e-order-details.component.scss',
})
export class EOrderDetailsComponent {
    employeeDetails: EmployeeInfo;
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
        private _productService: EmployeeService,
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
            this._productService
                .loadEmployeesById(this.id)
                .then((organizationInfo: any): any => {
                    this.employeeDetails = organizationInfo?.data[0];
                })
                .catch((error): any => {});
        }
    }
}
