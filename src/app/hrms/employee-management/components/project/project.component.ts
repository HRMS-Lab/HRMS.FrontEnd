import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { EmployeeProjectInfo, EmployeeProjectInfoList, EmployeeProjectInfoPayload } from '../../models/employee-project.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { EmployeeProjectService } from '../../services/employee-project.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ProjectInfo } from '../../../../lookup/models/Project.model';
import { ProjectService } from '../../../../lookup/services/project.service';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
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
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  @Input() createEmployeeForm: boolean = false;
  @Input() employeeFormId: number;
  @Output() formEmployeeFinish = new EventEmitter();
  @Output() formEmployeePrevious = new EventEmitter();

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private employeeProjectService = inject(EmployeeProjectService);
  private projectService = inject(ProjectService);
  private employeeService = inject(EmployeeService);
  private toastrService = inject(ToastrService);
  public themeService = inject(CustomizerSettingsService);
  private router = inject(Router);

  employeeProject: EmployeeProjectInfo;
  employeeProjectList!: EmployeeProjectInfoList[];
  EmployeeProjectForm: FormGroup;
  dataSource = new MatTableDataSource<EmployeeProjectInfoList>(this.employeeProjectList);
  employeeId: number;
  empId: number;
  employee: any = {
    id: 0,
    name: ''
  }
  tokenObj: any;
  orgId: any;
  projects: ProjectInfo[];
  editMode: boolean = false;
  isToggled = false;
  refrenceCount = Array.from({ length: 5 }, (_, i) => i + 1);
  employeeProjectErrorMsg: string = '';
  projCount:number=0;
  displayedColumns: string[] = [
    'ProjectName',
    'action',
  ];

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.route.params.subscribe((params) => {
      this.empId = params['id'];
    });

    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });

    this.initForm();
    this.getProjects();
    this.getEmployeeById();
  }

  initForm() {
    this.EmployeeProjectForm = this.fb.group({
      projectId: [this.employeeProject?.projectId ?? null, [Validators.required]],
      employeeId: [
        this.createEmployeeForm ? this.employeeFormId : this.empId ?? null,
        [Validators.required],
      ],
      reasonOfChange: [this.employeeProject?.reasonOfChange ?? '', [Validators.required]],
      refrence1: [this.employeeProject?.refrence1 ?? ''],
      refrence2: [this.employeeProject?.refrence2 ?? ''],
      refrence3: [this.employeeProject?.refrence3 ?? ''],
      refrence4: [this.employeeProject?.refrence4 ?? ''],
      refrence5: [this.employeeProject?.refrence5 ?? ''],
      active: [this.employeeProject?.active ?? true],
    });
  }

  getProjects() {
    this.projectService.loadProjects(this.orgId).then((result: any): any => {
      this.projects = result?.data;
    })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEmployeeById() {
    if (this.createEmployeeForm)
      return;

    this.employeeService
      .loadEmployeesById(this.empId)
      .then((result: any): any => {
        console.log('in emlotesee', result);
        if (result?.data.length > 0) {
          this.employee.id = result?.data[0].employeeId;
          this.employee.name = result?.data[0].fullName;
          this.getEmployeeProject();
        }
        else
          this.toastrService.error('No employee found');
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  getEmployeeProject() {
    this.employeeProjectService
      .loadEmployeeProject(undefined, undefined, this.empId)
      .then((result: any): any => {
        console.log(result);
        
        if (result?.data.length > 0) {
          this.editMode = true;
          this.employeeProjectList = result?.data;
          this.projCount = this.employeeProjectList.length;
          this.dataSource = new MatTableDataSource<EmployeeProjectInfoList>(
            this.employeeProjectList
          );
          this.initForm();
        }
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  onSubmit() {
    if (this.EmployeeProjectForm.valid) {
      if (this.editMode) {
        this.update();
      } else {
        this.add();
      }
    } else {
      this.employeeProjectErrorMsg = 'Please fill in all required fields correctly.';
    }
  }

  async add() {
    const newEmployeeeProject = this.EmployeeProjectForm.value;
    try {
      const result = await this.employeeProjectService.addEmployeeProject(newEmployeeeProject);
      console.log('Employee project added successfully:', result);
      this.toastrService.success('Employee project added successfully');
      if (!this.createEmployeeForm)
        this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      console.error('Error adding address:', error);
      this.employeeProjectErrorMsg = 'Error adding Employee project. Please try again.';
    } finally {
      //this.isLoading = false;
    }
  }

  async update() {
    const updatedEmployeeeProject = this.EmployeeProjectForm.value;
    try {
      const result = await this.employeeProjectService.updateEmployeeProject(
        this.employee.id,
        updatedEmployeeeProject
      );
      console.log('Employee project updated successfully:', result);
      this.toastrService.success('Employee project updated successfully');
      this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      console.error('Error updating address:', error);
      this.employeeProjectErrorMsg = 'Error updating Employee project. Please try again.';
    } finally {
      //this.isLoading = false;
    }
  }

  deleteEmpProject(empId:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await this.attechmentService.deleteAttachmemt(attachmentId);
        // const index = this.employeeAttachments.findIndex(item => item.attachmentId === attachmentId);
        // if (index !== -1)
        //   this.employeeAttachments.splice(index, 1); // Removes 1 item at the found index

        this.toastrService.success('Employee project deleted successfully');
      }
    });
  }

  formEmployeePreviousFn() {
    this.formEmployeePrevious.emit();
  }

  formEmployeeFinishFn() {
    this.formEmployeeFinish.emit();
  }
}
