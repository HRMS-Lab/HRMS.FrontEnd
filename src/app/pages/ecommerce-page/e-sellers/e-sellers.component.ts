import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrganizationInfo } from './model/organizations.model';
import { OrganizationsService } from './services/organizations.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-e-sellers',
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
    templateUrl: './e-sellers.component.html',
    styleUrl: './e-sellers.component.scss',
})
export class ESellersComponent {
    Organization!: OrganizationInfo[];
    displayedColumns: string[] = [
        'orgName',
        'orgDescription',
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

    dataSource = new MatTableDataSource<OrganizationInfo>(this.Organization);
    orgId!: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    ngOnInit(): void {
        this.loadOrganization();
    }

    async loadOrganization(): Promise<void> {
        this._orgService
            .loadOrganization()
            .then((OrganizationInfo: any): any => {
                this.Organization = OrganizationInfo?.data;
                this.dataSource = new MatTableDataSource<OrganizationInfo>(
                    this.Organization
                ); // Corrected line
            })
            .catch((error: any): any => {
                console.error('Error loading Organization:', error);
            });
    }
    getToEditPageandSetIds(id: number) {
        this.router.navigate(['/ecommerce-page/create-seller'], {
            queryParams: {
                id,
                editMode: true,
            },
        });
    }
    getToViewPageandSetIds(id: number) {
        this.router.navigate(['/ecommerce-page/seller-details'], {
            queryParams: {
                id,
            },
        });
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _orgService: OrganizationsService,
        private router: Router
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }
    goToRegoinPage(id: number): void {
        this.router.navigate(['/ecommerce-page/create-regoin'], {
            queryParams: {
                id,
                editMode: true,
            },
        });
    }
    goToRegoinPageDetails(id: number): void {
        this.router.navigate(['/ecommerce-page/regoin-details'], {
            queryParams: {
                id,
            },
        });
    }
    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
