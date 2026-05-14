import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RoleInfo } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-role',
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
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private roleService = inject(RoleService);

  RoleForm: FormGroup;
  roles!: RoleInfo[];
  role: RoleInfo;
  dataSource = new MatTableDataSource<RoleInfo>(this.roles);
  displayedColumns: string[] = [
    'roleName',
    'roleDescription',
    'active',
    'action',
  ];
  orgId: number;
  tokenObj: any;
  errorMsg: string;
  editMode: boolean;
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
    this.get();
  }

  initForm() {
    this.RoleForm = this.fb.group({
      id: [this.role?.roleId ?? null],
      roleName: [this.role?.roleName ?? '', [Validators.required]],
      roleDescription: [this.role?.roleDescription ?? '', [Validators.required]],
      markInActive: [this.role?.active ?? true, [Validators.required]]
    });
  }

  get() {
    this.roleService.loadRoles()
      .then((result: any): any => {
        this.roles = result?.data;
        this.dataSource = new MatTableDataSource<RoleInfo>(
          this.roles
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.RoleForm.value) {
      if (!this.editMode)
        this.add();
      else
        this.update();
    }
  }

  add() {
    const newRole = this.RoleForm.value;
    this.roleService.addRole(newRole)
      .then(result => {
        console.log(' Role added successfully:', result);
        this.toastrService.success(' Role added successfully');
        this.get();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding role. Please try again.';
      })
  }

  update() {
    console.log(this.RoleForm.value);
    
    const updateRole = this.RoleForm.value;
    this.roleService.updateRole(updateRole.id, updateRole)
      .then(result => {
        console.log(' role updated successfully:', result);
        this.toastrService.success(' role updated successfully');
        this.get();
        this.reset();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error updating  role. Please try again.';
      })
  }

  passData(row: any) {
    this.role = row;
    this.editMode = true;
    this.initForm();
  }

  reset() {
    this.role = {
      roleId: 0,
      roleName: '',
      roleDescription: '',
      active: true,
      dateCreated: null,
      dateUpdated: null
    };
    this.editMode = false;
    this.initForm();
  }

}
