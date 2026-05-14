import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { AdminInfo } from '../../models/admin.model';
import { ProjectInfo } from '../../../../lookup/models/Project.model';
import { ProjectService } from '../../../../lookup/services/project.service';
import { AdminService } from '../../services/admin.service';
import { jwtDecode } from 'jwt-decode';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminProjectInfo, ChangeStatusPayload } from '../../models/admin-project.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AdminProjectService } from '../../services/admin-project.service';
import { ToastrService } from 'ngx-toastr';
import { MatChipsModule } from '@angular/material/chips';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-projects',
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
    MatChipsModule
  ],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.scss'
})
export class AdminProjectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private projectService = inject(ProjectService);
  private adminService = inject(AdminService);
  private adminProjectService = inject(AdminProjectService);
  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);

  AdminProjectForm: FormGroup;
  adminProjects!: AdminProjectInfo[];
  adminProject!: AdminProjectInfo;
  admins: AdminInfo[];
  projects: ProjectInfo[];
  errorMsg: string;
  tokenObj: any;
  orgId: number;
  currentProjects: any;
  editMode: boolean = false;
  dataSource = new MatTableDataSource<AdminProjectInfo>(this.adminProjects);
  displayedColumns: string[] = [
    'userName',
    'projectName',
    'action',
  ];
  pageNumber: number = 1;
  pageSize: number = 10;
  count: number;

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.initForm();
    this.getAdmins();
    this.getProjects();
    this.getAdminProjects();
  }

  initForm() {
    this.AdminProjectForm = this.fb.group({
      adminId: [this.adminProject?.userId ?? null, [Validators.required]],
      projectIds: [this.adminProject?.projects ?? null, [Validators.required]]
    });
  }

  getAdmins() {
    if (this.orgId)
      this.adminService.loadAdmins(this.orgId)
        .then((result: any): any => {
          this.admins = result?.data;
        })
        .catch((error): any => {
          console.log(error);
        });
  }

  getProjects() {
    this.projectService.loadProjects(this.orgId)
      .then((result: any): any => {
        this.projects = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getAdminProjects() {
    this.adminProjectService.loadAdminProjects()
      .then((result: any): any => {
        this.adminProjects = result?.data;
        this.dataSource = new MatTableDataSource<AdminProjectInfo>(
          this.adminProjects
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.AdminProjectForm.value) {
      if (!this.editMode)
        this.add();
      else {
        debugger;
        const newProjects = this.AdminProjectForm.value.projectIds.filter((id: number) => !this.currentProjects.includes(id));
        // Check selected new projects
        if (newProjects.length > 0) {
          console.log(newProjects);
          this.add(newProjects);
        }
        //Remove last projects
        const removedProject = this.currentProjects.filter((id: number) => !this.AdminProjectForm.value.projectIds.includes(id));
        if (removedProject.length > 0) {
          console.log(removedProject);
          //this.removeProject(this.AdminProjectForm.value.adminId, removedProject);
        }
      }
    }
  }

  async add(newProjects?: any[]) {
    const newAdminProject = this.AdminProjectForm.value;
    if (newProjects && newProjects.length > 0)
      newAdminProject.projectIds = newProjects;
    debugger;
    try {
      const result = await this.adminProjectService.addAdminProject(newAdminProject);
      console.log('Admin assigned to projects successfully:', result);
      this.toastrService.success('Admin assigned to projects successfully');
      this.resetForm();
    } catch (error) {
      console.error('Error adding address:', error);
      this.errorMsg = 'Error adding Employee project. Please try again.';
    } finally {
    }
  }

  async update() {
    const newAdminProject = this.AdminProjectForm.value;
    try {
      const result = await this.adminProjectService.updateAdminProject(newAdminProject);
      console.log('Admin assigned to projects updated successfully:', result);
      this.toastrService.success('Admin assigned to projects updated successfully');
      this.resetForm();
    } catch (error) {
      console.error('Error adding address:', error);
      this.errorMsg = 'Admin assigned to projects. Please try again.';
    } finally {
    }
  }

  resetForm() {
    this.AdminProjectForm.reset();
    this.getAdminProjects();
    this.editMode = false;
  }

  removeProject(adminId: any, project: any) {
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
        const obj: ChangeStatusPayload = {
          adminId: adminId,
          projectIds: [project.projectId],
          isActive: false
        };
        console.log(obj);
        await this.adminProjectService.ChangeStatus(obj);

        this.adminProjects.forEach(user => {
          if (user.userId === adminId) {
            const projectIndex = user.projects.findIndex(p => p.projectId === project.projectId);
            if (projectIndex !== -1) {
              user.projects.splice(projectIndex, 1);  // Remove the project at the found index
            }
          }
        });

        this.toastrService.success('Project deleted successfully');
      }
    });
  }

  updateAdmin(obj: AdminProjectInfo) {
    console.log(obj);
    this.adminProject = {
      userName: '',
      userId: obj.userId,
      projects: obj.projects.map((item): any => item.projectId)
    }
    this.adminProject.userId = obj.userId;
    this.adminProject.projects = obj.projects.map((item): any => item.projectId);
    this.currentProjects = obj.projects.map((item): any => item.projectId);
    this.editMode = true;
    this.initForm();
  }
}
