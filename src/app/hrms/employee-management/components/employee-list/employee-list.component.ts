import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { EmployeeInfo } from '../../../../pages/ecommerce-page/e-orders/models/employee.model';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  employees!: EmployeeInfo[];
  dataSource = new MatTableDataSource<EmployeeInfo>(this.employees);
  searchSubject: Subject<string> = new Subject<string>();  // Subject to handle search events
  pageNumber: number = 1;
  pageSize: number = 10;
  empCounts: number;

  displayedColumns: string[] = [
    'EmployeeCode',
    'EmployeeName',
    'ProjectName',
    'EmployeePhone',
    'nationalId',
    'hireDate',
    'departmentName',
    // 'orgName',
    'status',
    'action',
  ];

  // isToggled
  isToggled = false;
  orgId!: number;

  constructor(
    public themeService: CustomizerSettingsService,
    private _productService: EmployeeService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    this.loadEmployees();

    // Subscribe to search term changes with debouncing
    this.searchSubject.pipe(
      debounceTime(500), // Wait for 500ms after the last keystroke
      switchMap((searchTerm) => this.loadEmployees(searchTerm)) // Call loadEmployees with the search term
    ).subscribe();
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  async loadEmployees(filter?: string): Promise<void> {
    this._productService
      .loadEmployees(this.pageNumber, this.pageSize, filter)
      .then((EmployeeInfo: any): any => {
        this.employees = EmployeeInfo?.data?.items;
        this.empCounts = EmployeeInfo?.data?.totalPages;
        this.dataSource = new MatTableDataSource<EmployeeInfo>(
          this.employees
        ); // Corrected line
      })
      .catch((err): any => {
        console.error('Error loading Employee:', err);
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

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  onPageChanged(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.loadEmployees();
  }

  search(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
    //this.loadEmployees(searchTerm.target.value);
  }

}
