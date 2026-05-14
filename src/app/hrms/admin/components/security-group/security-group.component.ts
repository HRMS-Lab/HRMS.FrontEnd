import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { SecurityGroupService } from '../../services/security-group.service';
import { ToastrService } from 'ngx-toastr';
import { SecurityGroupInfo, UpdateSecurityGroupPayload } from '../../models/SecurityGroups.model';
import { jwtDecode } from 'jwt-decode';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-security-group',
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
  templateUrl: './security-group.component.html',
  styleUrl: './security-group.component.scss'
})
export class SecurityGroupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private securityGroupService = inject(SecurityGroupService);

  SecurityGroupForm: FormGroup;
  securityGroups!: SecurityGroupInfo[];
  securityGroup: SecurityGroupInfo;
  dataSource = new MatTableDataSource<SecurityGroupInfo>(this.securityGroups);
  displayedColumns: string[] = [
    'securityGroupName',
    'active',
    'action',
  ];
  orgId: number;
  tokenObj: any;
  errorMsg: string;
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
    this.getSecurityGroups();
  }

  initForm() {
    this.SecurityGroupForm = this.fb.group({
      id: [null],
      orgId: [this.orgId],
      securityGroupName: [this.securityGroup?.securityGroupName ?? '', [Validators.required]],
      active: [this.securityGroup?.active ?? true, [Validators.required]]
    });
  }

  getSecurityGroups() {
    this.securityGroupService.loadSecurityGroups()
      .then((result: any): any => {
        this.securityGroups = result?.data;
        this.dataSource = new MatTableDataSource<SecurityGroupInfo>(
          this.securityGroups
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.SecurityGroupForm.value)
      this.add();
  }

  add() {
    const newSecurityGroup = this.SecurityGroupForm.value;
    this.securityGroupService.addSecurityGroup(newSecurityGroup)
      .then(result => {
        console.log('Security Group added successfully:', result);
        this.toastrService.success('Security Group added successfully');
        this.getSecurityGroups();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding Security Group. Please try again.';
      })
  }

  update(groupObj: any) {
    const updateGroup: UpdateSecurityGroupPayload = {
      id: groupObj.securityGroupId,
      active: groupObj.active
    };

    this.securityGroupService.updateSecurityGroup(updateGroup)
      .then(result => {
        console.log('Security Group updated successfully:', result);
        this.toastrService.success('Security Group updated successfully');
        //this.getSecurityGroups();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error updating Security Group. Please try again.';
      })
  }
}
