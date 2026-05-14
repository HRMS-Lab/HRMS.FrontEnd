import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SecurityRoleInfo, SecurityRolePayload } from '../../models/SecurityRole.model';
import { SecurityRoleService } from '../../services/security-role.service';
import { jwtDecode } from 'jwt-decode';
import { RoleService } from '../../services/role.service';
import { SecurityGroupService } from '../../services/security-group.service';
import { SecurityGroupInfo } from '../../models/SecurityGroups.model';
import { RoleInfo } from '../../models/role.model';

@Component({
  selector: 'app-security-role',
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
  templateUrl: './security-role.component.html',
  styleUrl: './security-role.component.scss'
})
export class SecurityRoleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private roleService = inject(RoleService);
  private securityRoleService = inject(SecurityRoleService);
  private securityGroupService = inject(SecurityGroupService);

  SecurityRoleForm: FormGroup;
  securityRoles!: SecurityRoleInfo[];
  securityRole: SecurityRolePayload;
  dataSource = new MatTableDataSource<SecurityRoleInfo>(this.securityRoles);
  displayedColumns: string[] = [
    'securityGroupName',
    'securityRoleName',
    'action',
  ];
  roles: RoleInfo[];
  securityGroups: SecurityGroupInfo[];
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
    this.getRoles();
    this.getSecurityGroup();
    this.getSecurityRoles();
  }

  initForm() {
    this.SecurityRoleForm = this.fb.group({
      secRoleId: [this.securityRole?.secRoleId ?? null],
      secGroupId: [this.securityRole?.secGroupId ?? null, [Validators.required]],
      roleId: [this.securityRole?.roleId ?? null, [Validators.required]]
    });
  }

  getSecurityGroup() {
    this.securityGroupService.loadSecurityGroups()
      .then((result: any) => {
        this.securityGroups = result.data;
      })
      .catch(error => console.log(error))
  }

  getRoles() {
    this.roleService.loadRoles()
      .then((result: any) => {
        this.roles = result.data;
      })
      .catch(error => console.log(error))
  }

  getSecurityRoles() {
    this.securityRoleService.loadSecurityRoles()
      .then((result: any) => {
        this.securityRoles = result?.data;
        this.dataSource = new MatTableDataSource<SecurityRoleInfo>(
          this.securityRoles
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
  }

  onSubmit() {
    if (this.SecurityRoleForm.value) {
      if (!this.editMode)
        this.add();
      else
        this.update();
    }
  }

  add() {
    const newSecurityRole = this.SecurityRoleForm.value;
    this.securityRoleService.addSecurityRole(newSecurityRole)
      .then(result => {
        console.log('Security role added successfully:', result);
        this.toastrService.success('Security role added successfully');
        this.getSecurityRoles();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding Security role. Please try again.';
      })
  }

  update() {
    const updateSecurityRole = this.SecurityRoleForm.value;
    this.securityRoleService.updateSecurityRole(updateSecurityRole.secRoleId, updateSecurityRole)
      .then(result => {
        console.log('Security role updated successfully:', result);
        this.toastrService.success('Security role updated successfully');
        this.getSecurityRoles();
        this.reset();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error updating Security role. Please try again.';
      })
  }

  passData(securityRoleObj: any) {
    console.log(securityRoleObj);

    this.securityRole = securityRoleObj;
    this.editMode = true;
    this.initForm();
  }

  reset() {
    this.securityRole = {
      secRoleId: null,
      secGroupId: null,
      roleId: null
    };
    this.editMode = false;
    this.initForm();
  }
}
