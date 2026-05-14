import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { DisclaimerInfo, DisclaimerTypeInfo } from '../../models/disclaimer.model';
import { DisclaimerService } from '../../services/disclaimer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeInfo } from '../../../../pages/ecommerce-page/e-orders/models/employee.model';
// import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';
import { MatButtonModule } from '@angular/material/button';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, startWith, Subject, switchMap, tap } from 'rxjs';
import { EmployeeInternalService } from '../../../employee-management/services/employee.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../attendance/attendance.component';
import moment from 'moment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    //AsyncPipe
  ],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DisclaimerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);  
  private disclaimerService = inject(DisclaimerService);
  private employeeService = inject(EmployeeInternalService);
  private toastrService = inject(ToastrService);

  DisclaimerForm: FormGroup;
  disclaimerTypes: DisclaimerTypeInfo[];
  employeeDisclaimer!: DisclaimerInfo[];
  autoComplateEmployee: EmployeeInfo[];
  orgId: number;
  tokenObj: any;
  errorMsg: string;
  dataSource = new MatTableDataSource<DisclaimerInfo>(this.employeeDisclaimer);
  displayedColumns: string[] = [
    'employeeName',
    'disclaimerTypeName',
    'disclaimerDate',
    'disclaimerDateFrom',
    'reasonOfDisclaimer',
    'status',
    'action',
  ];
  options: string[] = [];
  filteredOptions: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();
  employee: any;
  selectedEmployee: any;
  pageNumber: number = 1;
  pageSize: number = 10;
  count: number;

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    // Subscribe to search term changes with debouncing
    this.searchSubject.pipe(
      debounceTime(700), // Wait for 700ms after the last keystroke
      switchMap((searchTerm) => this.loadEmployees(searchTerm)) // Call loadEmployees with the search term
    ).subscribe();

    this.initForm();
    this.getDisclaimerTypes();
  }

  initForm(){
    this.DisclaimerForm = this.fb.group({
      orgId: [this.orgId, [Validators.required]],
      disclaimerTypeId: [null, [Validators.required]],
      disclaimerDateFrom: [null, [Validators.required]],
      reasonOfDisclaimer: [null, [Validators.required]],
      disclaimerDate:[moment(new Date).format('yyyy-MM-DD')],
      employeeId: [null, [Validators.required]],
    });
  }

  getDisclaimerTypes() {
    this.disclaimerService.loadDisclaimerType(this.orgId)
      .then((result: any): any => {
        this.disclaimerTypes = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  employeeSearch(event: any) {
    const searchTerm = event;
    this.searchSubject.next(searchTerm);
  }

  async loadEmployees(filter?: string): Promise<void> {
    this.employeeService
      .loadEmployees(1, 20, filter)
      .then((EmployeeInfo: any): any => {
        this.filteredOptions = EmployeeInfo?.data?.items;
      })
      .catch((err): any => {
        console.error('Error loading Employee:', err);
      });
  }

  selectEmployee(empObj: any) {
    this.selectedEmployee = empObj;
    this.DisclaimerForm.controls['employeeId'].setValue(empObj.employeeId);
    this.getDisclaimerEmployee(empObj.employeeId);
  }

  getDisclaimerEmployee(empId: number) {
    this.disclaimerService.loadEmployeeDisclaimer(this.orgId, empId)
      .then((result: any): any => {
        this.employeeDisclaimer = result?.data;
        console.log(this.employeeDisclaimer);
        
        this.dataSource = new MatTableDataSource<DisclaimerInfo>(
          this.employeeDisclaimer
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  async onSubmit() {
    const newDisclaimerForm = this.DisclaimerForm.value;
    newDisclaimerForm.disclaimerDateFrom = moment(newDisclaimerForm.disclaimerDateFrom).format('yyyy-MM-DD')
    console.log(newDisclaimerForm);
    try {
      const result = await this.disclaimerService.addDisclaimer(newDisclaimerForm);
      console.log('Disclaimer added successfully:', result);
      this.toastrService.success('Disclaimer added successfully');
      this.initForm();
      //this.employee = null;
      //this.selectedEmployee = null;
      this.getDisclaimerEmployee(newDisclaimerForm.employeeId);
    }
    catch (error) {
      console.error('Error adding address:', error);
      this.errorMsg = 'Error adding disclaimer. Please try again.';
    }
    finally {
    }
  }

  updateDisclaimerStatus(disclaimerObj:any){
    disclaimerObj.active != disclaimerObj.active;
    this.disclaimerService.updateDisclaimer(disclaimerObj.disclaimerId, disclaimerObj)
      .then((result: any): any => {
      this.toastrService.success('Disclaimer updated successfully');
        this.getDisclaimerEmployee(disclaimerObj.employeeId);
      })
      .catch((error): any => {
        console.log(error);
      });
  }
}
