import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProductsService } from '../e-products-list/service/products.service';
import { BranchesInfo } from './models/branches.model';
import { BranchesService } from './service/branches.service';

@Component({
    selector: 'app-branches',
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
    templateUrl: './branches.component.html',
    styleUrl: './branches.component.scss',
})
export class BranchesComponent {
    branches!: BranchesInfo[];
    displayedColumns: string[] = [
        'branchName',
        'refrence1',
        'refrence2',
        'active',
        'dateCreated',
        'action',
    ];

    dataSource = new MatTableDataSource<BranchesInfo>(this.branches);
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
                    this.loadBranches();
                }
            })
            .catch((error): any => {});
    }
    async loadBranches(): Promise<void> {
        this._branchsService
            .loadBranchess(this.orgId)
            .then((BranchesInfo: any): any => {
                this.branches = BranchesInfo?.data;
                this.dataSource = new MatTableDataSource<BranchesInfo>(
                    this.branches
                ); // Corrected line
            })
            .catch((error): any => {
                console.error('Error loading Branche:', error);
            });
    }
    getToEditPageandSetIds(id: number) {
        this.router.navigate(['/ecommerce-page/create-branch'], {
            queryParams: {
                orgId:this.orgId,
                id,
                editMode: true,
            },
        });
    }
    getToViewPageandSetIds(id: number) {
        this.router.navigate(['/ecommerce-page/branch-details'], {
            queryParams: {
                orgId:this.orgId,
                id,
            },
        });
    }
    gotoCreateBranch() {
        this.router.navigate(['/ecommerce-page/create-branch'], {
            queryParams: {
                orgId: this.orgId,
                // id: this.id,
            },
        });
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _productService: ProductsService,
        private _branchsService: BranchesService,
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
