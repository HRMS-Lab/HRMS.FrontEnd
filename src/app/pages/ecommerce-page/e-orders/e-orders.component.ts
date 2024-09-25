import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeInfo } from './models/employee.model';

@Component({
    selector: 'app-e-orders',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
        CommonModule,
    ],
    templateUrl: './e-orders.component.html',
    styleUrl: './e-orders.component.scss',
})
export class EOrdersComponent {
    employees!: EmployeeInfo[];
    displayedColumns: string[] = [
        'EmployeeName',
        'EmployeeEmail',
        'EmployeePhone',
        'nationalId',
        'hireDate',
        'birthDate',
        'departmentName',
        'orgName',
        'action',
    ];

    dataSource = new MatTableDataSource<EmployeeInfo>(this.employees);
    orgId!: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    ngOnInit(): void {
        this.loadEmployees();
    }

    async loadEmployees(): Promise<void> {
        this._productService
            .loadEmployees()
            .then((EmployeeInfo: any): any => {
                this.employees = EmployeeInfo?.data;
                this.dataSource = new MatTableDataSource<EmployeeInfo>(
                    this.employees
                ); // Corrected line
            })
            .catch((error): any => {
                console.error('Error loading Employee:', error);
            });
    }
    getToEditPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/create-order'], {
            queryParams: {
                orgId,
                id,
                editMode: true,
            },
        });
    }
    getToViewPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/order-details'], {
            queryParams: {
                orgId,
                id,
            },
        });
    }
    gotToAdresses(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/adresses'], {
            queryParams: {
                orgId,
                id,
            },
        });
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: EmployeeService,
        private router: Router
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
