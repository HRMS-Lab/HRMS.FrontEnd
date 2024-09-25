import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TitleInfo } from './model/titles.model';
import { TitleService } from './services/titles.service';

@Component({
    selector: 'app-e-customers',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './e-customers.component.html',
    styleUrl: './e-customers.component.scss'
})
export class ECustomersComponent {
    Titles!: TitleInfo[];
    displayedColumns: string[] = [
        'titleName',
        'titleDescription',
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

    dataSource = new MatTableDataSource<TitleInfo>(this.Titles);
    orgId!: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    ngOnInit(): void {
        this.loadTitles();
    }

    async loadTitles(): Promise<void> {
        this._titleService
            .loadTitles()
            .then((TitleInfo: any): any => {
                this.Titles = TitleInfo?.data;
                this.dataSource = new MatTableDataSource<TitleInfo>(
                    this.Titles
                ); // Corrected line
            })
            .catch((error): any => {
                console.error('Error loading Title:', error);
            });
    }
    getToEditPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/crm-page/create-customer'], {
            queryParams: {
                orgId,
                id,
                editMode: true,
            },
        });
    }
    getToViewPageandSetIds(id: number, orgId: number) {
        this.router.navigate(['/ecommerce-page/customer-details'], {
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
        private _titleService: TitleService,
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
