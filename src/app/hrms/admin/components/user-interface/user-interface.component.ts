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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserInterfaceService } from '../../services/user-interface.service';
import { ToastrService } from 'ngx-toastr';
import { UserInterfaceInfo } from '../../models/UserInterface.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-interface',
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
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.scss'
})
export class UserInterfaceComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private userInterfaceService = inject(UserInterfaceService);

  UserInterfaceForm: FormGroup;
  userInterfaces!: UserInterfaceInfo[];
  userInterface: UserInterfaceInfo;
  dataSource = new MatTableDataSource<UserInterfaceInfo>(this.userInterfaces);
  displayedColumns: string[] = [
    'uiActualId',
    'uiName',
    'url',
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
    this.UserInterfaceForm = this.fb.group({
      uiActualId: ['', [Validators.required]],
      url: ['', [Validators.required]],
      uiName: ['', [Validators.required]],
      active: [true, [Validators.required]]
    });
  }

  get() {
    this.userInterfaceService.loadUserInterfaces()
      .then((result: any): any => {
        this.userInterfaces = result?.data;
        this.dataSource = new MatTableDataSource<UserInterfaceInfo>(
          this.userInterfaces
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.UserInterfaceForm.value) {
      this.add();
    }
  }

  add() {
    const newuser = this.UserInterfaceForm.value;
    this.userInterfaceService.addUserInterface(newuser)
      .then(result => {
        console.log(' user interface added successfully:', result);
        this.toastrService.success(' user interface added successfully');
        this.get();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding user interface. Please try again.';
      })
  }

  changeActivity(row: any) {
    this.userInterfaceService.ChangeUiActivity(row.uiId, row.active)
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
