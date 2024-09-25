import { NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { ProductsService } from './service/products.service';
import { DepartmentInfo, DepartmentInfoPayload } from './models/products.model';

@Component({
    selector: 'app-e-products-list',
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
    ],
    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss',
})
export class EProductsListComponent implements OnInit {
    deparments!: DepartmentInfo[];
    displayedColumns: string[] = [
        'departmentName',
        'departmentDescription',
        'org',
        'refrence1',
        'refrence2',
        'active',
        'dateCreated',
        'action',
    ];

    dataSource = new MatTableDataSource<DepartmentInfo>(this.deparments);
    orgId!: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    ngOnInit(): void {
        this.loadOrganiztionOrg();
    }
    async loadOrganiztionOrg(): Promise<void> {
        this._productService
            .loadOrganization()
            .then((organizationInfo: any): any => {
                this.orgId = organizationInfo?.data?.[0].orgId;
                if (this.orgId) {
                    this.loadDepartments();
                }
            })
            .catch((error): any => {});
    }
    async loadDepartments(): Promise<void> {
        this._productService
            .loadDepartments(this.orgId)
            .then((departmentInfo: any): any => {
                this.deparments = departmentInfo?.data;
                this.dataSource = new MatTableDataSource<DepartmentInfo>(
                    this.deparments
                ); // Corrected line
            })
            .catch((error): any => {
                console.error('Error loading Department:', error);
            });
    }
    getToEditPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/create-product'], {
            queryParams: {
                orgId,
                id,
                editMode: true,
            },
        });
    }
    getToViewPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/product-details'], {
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
        private _productService: ProductsService,
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
