import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { EmployeeInfo } from '../../../../pages/ecommerce-page/e-orders/models/employee.model';
import { EmployeeInternalService } from '../../services/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportService } from '../../../../shared/services/export.service';
import { PDF_EXPORT_CONFIG, PdfExportService } from '@codewithrajat/rm-ng-pdf-export';

@Component({
  selector: 'app-employees-registry',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    DatePipe,
    PdfExportService,
    {
      provide: PDF_EXPORT_CONFIG,  // ✅ Provide the configuration token
      useValue: {
        pageSize: 'A4',
        orientation: 'portrait',
        filename: 'export.pdf',
        openInNewTab: false
      }
    }
  ],
  templateUrl: './employees-registry.component.html',
  styleUrl: './employees-registry.component.scss'
})

export class EmployeesRegistryComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfContent') contentRef!: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  employees!: EmployeeInfo[];
  dataSource = new MatTableDataSource<EmployeeInfo>(this.employees);
  searchSubject: Subject<string> = new Subject<string>();  // Subject to handle search events
  employeeCode: string;
  fullName: string;
  nationalId: string;
  phone: string;
  tableCount: number;
  pageSize: number;

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
    //'action',
  ];

  // isToggled
  isToggled = false;
  orgId!: number;

  constructor(
    public themeService: CustomizerSettingsService,
    private _employeeService: EmployeeInternalService,
    private exportService: ExportService,
    private datePipe: DatePipe,
    private pdfExport: PdfExportService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  async loadEmployeesRegistry(): Promise<void> {
    this._employeeService
      .loadEmployeesRegistry(this.employeeCode, this.fullName, this.nationalId, this.phone)
      .then((EmployeeInfo: any): any => {
        this.employees = EmployeeInfo?.data;
        this.tableCount = EmployeeInfo?.data.length;
        this.dataSource = new MatTableDataSource<EmployeeInfo>(
          this.employees
        ); // Corrected line
        this.dataSource.paginator = this.paginator;
      })
      .catch((err): any => {
        console.error('Error loading Employee:', err);
      });
  }

  async exportoExcel(){
    const timestamp = this.datePipe.transform(new Date(), 'yyyyMMdd_HHmmss');
    const fileName = `employees_registry_${timestamp}`;
    await this.exportService.toExcelWithStyle(this.employees, fileName);
  }

  exportoPDF(){
    const timestamp = this.datePipe.transform(new Date(), 'yyyyMMdd_HHmmss');
    const fileName = `employees_registry_${timestamp}.pdf`;
    this.exportService.exportToPdf('export-content', fileName)
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  onPageChanged(event: PageEvent): void {
    //this.pageNumber = event.pageIndex + 1;
    //this.loadEmployees();
  }

}


