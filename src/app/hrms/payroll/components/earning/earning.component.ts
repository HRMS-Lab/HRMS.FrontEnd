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
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { EarningInfo } from '../../models/earning.model';
import { EarningService } from '../../services/earning.service';

@Component({
  selector: 'app-earning',
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
  templateUrl: './earning.component.html',
  styleUrl: './earning.component.scss'
})
export class EarningComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private earningService = inject(EarningService);

  EarningForm: FormGroup;
  earnings!: EarningInfo[];
  earning: EarningInfo;
  dataSource = new MatTableDataSource<EarningInfo>(this.earnings);
  displayedColumns: string[] = [
    'earningName',
    'earningDescription',
    'refrence',
    'active'
  ];
  orgId: number;
  tokenObj: any;
  errorMsg: string;
  pageNumber: number = 1;
  pageSize: number = 10;
  count: number;
  submitted: boolean;

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
    this.EarningForm = this.fb.group({
      orgId: [this.orgId],
      payEarningId: [this.earning?.payEarningId ?? null],
      earningName: [this.earning?.earningName ?? '', [Validators.required]],
      earningDesc: [this.earning?.earningDesc ?? '', [Validators.required]],
      refrence: [this.earning?.refrence ?? '', [Validators.required]]
    });
  }

  get() {
    this.earningService.loadEarning(this.orgId)
      .then((result: any): any => {
        this.earnings = result?.data;
        this.dataSource = new MatTableDataSource<EarningInfo>(
          this.earnings
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    this.submitted = false
    if (this.EarningForm.value) {
      this.add();
    }
    else
      this.submitted = true;
  }

  add() {
    const newearning = this.EarningForm.value;
    this.earningService.addEarning(newearning)
      .then(result => {
        console.log('Earning added successfully:', result);
        this.toastrService.success('Earning added successfully');
        this.get();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding earning. Please try again.';
      })
  }

  update(recordDate: EarningInfo) {
    console.log(this.EarningForm.value);

    const updateEarning = {
      id: recordDate.payEarningId,
      active: recordDate.active
    }
    this.earningService.updateEarning(updateEarning)
      .then(result => {
        console.log('Earning updated successfully:', result);
        this.toastrService.success('Earning updated successfully');
        this.get();
        this.reset();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error updating earning. Please try again.';
      })
  }

  passData(row: any) {
    this.earning = row;
    this.initForm();
  }

  reset() {
    this.earning = {
      orgId: this.orgId,
      payEarningId: 0,
      earningName: '',
      earningDesc: '',
      refrence: '',
      active: true,
      dateCreated: '',
      dateUpdated: ''
    };
    this.initForm();
  }

}
