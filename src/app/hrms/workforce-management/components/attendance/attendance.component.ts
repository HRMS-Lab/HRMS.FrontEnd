import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_FORMATS, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../../lookup/services/project.service';
import { ProjectInfo } from '../../../../lookup/models/Project.model';
import { EmployeeInfo } from '../../../../pages/ecommerce-page/e-orders/models/employee.model';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';
import { EmployeeProjectService } from '../../../employee-management/services/employee-project.service';
import { AdminProjectService } from '../../services/admin-project.service';
import { jwtDecode } from 'jwt-decode';
import { AdminProjectInfo, Project } from '../../models/admin-project.model';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceRecordPayload, AttendanceTypeInfo, EmployeeAttendanceInfo } from '../../models/attendance.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class AttendanceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() max: any;

  private fb = inject(FormBuilder);
  private adminProjectService = inject(AdminProjectService);
  private employeeProjectService = inject(EmployeeProjectService);
  private attendanceService = inject(AttendanceService);
  private toastrService = inject(ToastrService);
  dataSource = new MatTableDataSource<EmployeeAttendanceInfo>;

  projects: Project[];
  employees: EmployeeInfo[];
  filteredEmployees: Observable<EmployeeInfo[]>;
  attendanceTypes: AttendanceTypeInfo[];

  AttendanceForm: FormGroup;
  selectedProject: number;
  fromDate: any;
  toDate: any;
  addFromDate: any;
  addToDate: any;
  tokenObj: any;
  attendanceDateType: string = 'single';
  singleAttendanceDate: any;
  userId: number;
  tableCount: number;
  pageSize: number = 10;
  displayedColumns: string[] = [
    'code',
    'fullName',
    'dateCalender',
    'attendanceTypeName',
    'checkInTime',
    'checkOutTime',
    'atten_Status'
  ];
  dateErrorMsg: string;
  singleDateErrorMsg: boolean;
  multiDateErrorMsg: boolean;
  tomorrow = new Date();
  selectedEmployee: any = {
    employeeId: null,
    fullName: ''
  };

  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    // Reset the time portion of tomorrow to avoid time issues in the date range
    this.tomorrow.setHours(0, 0, 0, 0);

    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.userId = this.tokenObj.Id;
    }

    this.initForm();
    this.getAdminProjects();
    this.getAttendanceType();

    this.filteredEmployees = this.AttendanceForm.controls['employeeId'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.fullName)), // Extract fullName for filtering
      map(value => this._filterEmployees(value))
    );
  }

  initForm() {
    this.AttendanceForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      attendenceTypeId: [null, [Validators.required]],
      attendanceDate: [null]
    });
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  getAdminProjects() {
    if (this.userId)
      this.adminProjectService.loadAdminProjects(this.userId)
        .then((result: any): any => {
          this.projects = result?.data[0]?.projects;
          // this.dataSource = new MatTableDataSource<AdminProjectInfo>(
          //   this.adminProjects
          // );
        })
        .catch((error): any => {
          console.log(error);
        });
  }

  getAttendanceType() {
    this.attendanceService.loadAttendanceType()
      .then((result: any): any => {
        this.attendanceTypes = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEmployees() {
    this.AttendanceForm.controls['employeeId'].setValue('');
    this.employeeProjectService.loadEmployeeProject(undefined, this.selectedProject)
      .then((result: any): any => {
        this.employees = result?.data;
        this.filteredEmployees = this.AttendanceForm.controls['employeeId'].valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.fullName)), // Extract fullName for filtering
          map(value => this._filterEmployees(value))
        );
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  displayFn(employee: EmployeeInfo): string {
    return employee ? employee.fullName : '';
  }

  private _filterEmployees(value: string): EmployeeInfo[] {
    const filterValue = value.toLowerCase();
    return this.employees?.filter(employee => employee.fullName.toLowerCase().includes(filterValue));
  }

  clearSelection(controlName:string) {
    this.AttendanceForm.controls[controlName].setValue('');
  }

  getEmployeeAttendance(isEmp?: boolean, event: any = null) {
    debugger;
    if (event != null) {
      this.selectedEmployee = event.option.value;
      //this.AttendanceForm.controls['employeeId'].setValue(selectedEmployee.employeeId)
      //console.log(selectedEmployee);
      //this.selectedEmployee = event;
    }

    this.dateErrorMsg = '';
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      this.dateErrorMsg = 'from date incorrect';
      return;
    }

    // const empId = this.AttendanceForm.value.employeeId;
    const empId = this.selectedEmployee.employeeId;
    const attendType = this.AttendanceForm.value.attendenceTypeId ?? undefined;
    const fromDate = (this.fromDate) ? moment(this.fromDate).format('yyyy-MM-DD') : undefined;
    const toDate = (this.toDate) ? moment(this.toDate).format('yyyy-MM-DD') : undefined;

    if (empId)
      this.attendanceService.loadEmployeeAttendance(empId, !isEmp ? attendType : undefined, fromDate, toDate)
        .then((result: any): any => {
          console.log(result);
          this.tableCount = result?.data.length;
          this.dataSource = new MatTableDataSource<EmployeeAttendanceInfo>(result?.data);
          this.dataSource.paginator = this.paginator;
        })
        .catch((error): any => {
          console.log(error);
        });
  }

  async onSubmit() {
    if (this.validate()) {
      if (this.attendanceDateType == 'single') {
        this.AttendanceForm.controls['attendanceDate'].setValue(this.singleAttendanceDate);
        await this.addAttendance(true);
      }
      else if (this.attendanceDateType == 'multi') {
        // For multi attendance, loop through the dates
        if (this.addFromDate && this.addToDate) {
          let currentDate = new Date(this.addFromDate);
          const endDate = new Date(this.addToDate);

          // Loop through each date in the range
          while (currentDate <= endDate) {
            // Set the date for attendance (or pass it to addAttendance)
            this.AttendanceForm.controls['attendanceDate'].setValue(new Date(currentDate));
            let showMsg = currentDate.getDate() === endDate.getDate() ? true : false;
            await this.addAttendance(showMsg);  // Call addAttendance for each date

            // Increment the currentDate by one day
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }
    }
  }

  validate() {
    this.singleDateErrorMsg = false;
    this.multiDateErrorMsg = false;

    if (this.attendanceDateType == 'single' && this.singleAttendanceDate == undefined) {
      this.singleDateErrorMsg = true;
      return false;
    }
    else if (this.attendanceDateType == 'multi' && (this.addFromDate == undefined || this.addToDate == undefined)) {
      this.multiDateErrorMsg = true;
      return false;
    }
    return true;
  }

  async addAttendance(showMsg?: boolean) {
    const newAttendance = this.AttendanceForm.value;
    newAttendance.attendanceDate = moment(newAttendance.attendanceDate).format('yyyy-MM-DD');
    newAttendance.employeeId = newAttendance.employeeId.employeeId
    console.log(newAttendance);
    const result = await this.attendanceService.addAttendance(newAttendance);
    console.log(result);
    if (showMsg)
      this.toastrService.success('Attendance added successfully');
    this.getEmployeeAttendance(true);
  }

  search() {
    if (this.fromDate && this.toDate)
      this.getEmployeeAttendance()
  }
}
