import { NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AttachmentInfo } from './model/attechment.model';
import { ProductsService } from '../e-products-list/service/products.service';
import { AttechmentService } from './service/attechment.service';

@Component({
    selector: 'app-e-categories',
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
    templateUrl: './e-categories.component.html',
    styleUrl: './e-categories.component.scss',
})
export class ECategoriesComponent implements OnInit {
    attechments!: AttachmentInfo[];
    displayedColumns: string[] = [
        'attachTypeID',
        'employeeId',
        'attachmentId',
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

    dataSource = new MatTableDataSource<AttachmentInfo>(this.attechments);
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
                    this.loadAttechment();
                }
            })
            .catch((error: any): any => {});
    }
    async loadAttechment(): Promise<void> {
        this._attechmentService
            .loadAttachmemts(this.orgId)
            .then((AttachmentInfo: any): any => {
                this.attechments = AttachmentInfo?.data;
                this.dataSource = new MatTableDataSource<AttachmentInfo>(
                    this.attechments
                ); // Corrected line
            })
            .catch((error: any): any => {
                console.error('Error loading Department:', error);
            });
    }
    getToEditPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/create-category'], {
            queryParams: {
                orgId,
                id,
                editMode: true,
            },
        });
    }
    getToViewPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/category-details'], {
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
        private _attechmentService: AttechmentService,

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
