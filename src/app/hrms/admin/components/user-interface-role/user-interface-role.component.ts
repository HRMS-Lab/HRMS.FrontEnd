import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
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
import { UserInterfaceRoleService } from '../../services/user-interface-role.service';
import { ToastrService } from 'ngx-toastr';
import { UserInterfaceRoleInfo } from '../../models/UserInterfaceRole.model';
import { jwtDecode } from 'jwt-decode';
import { Validators } from 'ngx-editor';
import { RoleService } from '../../services/role.service';
import { RoleInfo } from '../../models/role.model';
import { UserInterfaceService } from '../../services/user-interface.service';
import { UserInterfaceInfo } from '../../models/UserInterface.model';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';

@Component({
  selector: 'app-user-interface-role',
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
    MatCheckboxModule,
    GetItemNamePipe
  ],
  templateUrl: './user-interface-role.component.html',
  styleUrl: './user-interface-role.component.scss'
})
export class UserInterfaceRoleComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private roleService = inject(RoleService);
  private userInterfaceService = inject(UserInterfaceService);
  private userInterfaceRoleService = inject(UserInterfaceRoleService);

  UserUiRoleForm: FormGroup;
  userUiRoles!: UserInterfaceRoleInfo[];
  userUiRole: UserInterfaceRoleInfo;
  dataSource = new MatTableDataSource<UserInterfaceRoleInfo>(this.userUiRoles);
  displayedColumns: string[] = [
    'uiId',
    'roleName',
    'active',
    'action',
  ];
  roles: RoleInfo[];
  userInterfaces: UserInterfaceInfo[];
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
    this.getUi();
    this.getRoles();
  }

  initForm() {
    this.UserUiRoleForm = this.fb.group({
      uiId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      active: [true, [Validators.required]]
    });
  }

  getRoles() {
    this.roleService.loadRoles()
      .then((result: any) => {
        this.roles = result.data;
      })
      .catch(error => console.log(error))
  }

  getUi() {
    this.userInterfaceService.loadUserInterfaces()
      .then((result: any): any => {
        this.userInterfaces = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  get() {
    this.userInterfaceRoleService.load()
      .then((result: any): any => {
        this.userUiRoles = result?.data;
        this.dataSource = new MatTableDataSource<UserInterfaceRoleInfo>(
          this.userUiRoles
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.UserUiRoleForm.value) {
      this.add();
    }
  }

  add() {
    const newuser = this.UserUiRoleForm.value;
    this.userInterfaceRoleService.add(newuser)
      .then(result => {
        console.log('User interface role added successfully:', result);
        this.toastrService.success('User interface role added successfully');
        this.get();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding User interface role. Please try again.';
      })
  }

  changeActivity(row: any) {
    this.userInterfaceRoleService.ChangeActivity(row.uiId, row.active)
      .then(result => {
        console.log('Change Activity updated successfully:', result);
        this.toastrService.success('Change Activity updated successfully');
        this.get();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error Change Activity updating. Please try again.';
      })
  }
}
