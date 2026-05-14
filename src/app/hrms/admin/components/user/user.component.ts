import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from '../../models/User.model';
import { SecurityGroupService } from '../../services/security-group.service';
import { SecurityGroupInfo } from '../../models/SecurityGroups.model';

@Component({
  selector: 'app-user',
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
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private userService = inject(UserService);
  private securityGroupService = inject(SecurityGroupService);

  UserForm: FormGroup;
  users!: UserInfo[];
  securityGroups: SecurityGroupInfo[];
  user: UserInfo;
  dataSource = new MatTableDataSource<UserInfo>(this.users);
  displayedColumns: string[] = [
    'fullName',
    'userName',
    'securityGroupName',
    'isSuperviser',
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
    this.getSecurityGroup();
  }

  initForm() {
    this.UserForm = this.fb.group({
      orgID: [this.orgId],
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      securityGroupId: [null, [Validators.required]]
    });
  }

  getSecurityGroup() {
    this.securityGroupService.loadSecurityGroups()
      .then((result: any) => {
        this.securityGroups = result.data;
      })
      .catch(error => console.log(error))
  }

  get() {
    this.userService.loadUsers(this.orgId)
      .then((result: any): any => {
        this.users = result?.data;
        this.count = result?.data?.length;
        this.dataSource = new MatTableDataSource<UserInfo>(
          this.users
        );
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.UserForm.value) {
      this.add();
    }
  }

  add() {
    const newuser = this.UserForm.value;
    this.userService.addUser(newuser)
      .then(result => {
        console.log(' user added successfully:', result);
        this.toastrService.success(' user added successfully');
        this.get();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding user. Please try again.';
      })
  }

  changeActivity(row: any) {
    console.log(row);
    this.userService.ChangeActivity(row.userID, row.active)
      .then(result => {
        console.log(' Change Activity updated successfully:', result);
        this.toastrService.success(' Change Activity updated successfully');
        this.get();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error Change Activity updating. Please try again.';
      })
  }
}
