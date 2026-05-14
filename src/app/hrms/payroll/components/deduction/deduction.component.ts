import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { DeductionInfo } from '../../models/deduction.model';
import { DeductionService } from '../../services/deduction.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import { SysInfluneInfo } from '../../models/sysInflunes.model';
import { SysInfluneService } from '../../services/sys-influne.service';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';

@Component({
  selector: 'app-deduction',
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
  templateUrl: './deduction.component.html',
  styleUrl: './deduction.component.scss'
})
export class DeductionComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private deductionService = inject(DeductionService);
  private sysInfluneService = inject(SysInfluneService);

  DeductionForm: FormGroup;
  deductions!: DeductionInfo[];
  deduction: DeductionInfo;
  sysInflunes: SysInfluneInfo[];
  dataSource = new MatTableDataSource<DeductionInfo>(this.deductions);
  displayedColumns: string[] = [
    'deductionName',
    'deductionDescription',
    'refrence',
    'sysInflune',
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
    this.getSysInflunes();
  }

  initForm() {
    this.DeductionForm = this.fb.group({
      orgId: [this.orgId],
      payDeductId: [this.deduction?.payDeductId ?? null],
      deductionName: [this.deduction?.deductionName ?? '', [Validators.required]],
      deductionDesc: [this.deduction?.deductionDesc ?? '', [Validators.required]],
      refrence: [this.deduction?.refrence ?? '', [Validators.required]],
      sysInfID: [this.deduction?.sysInfID ?? null]
    });
  }

  get() {
    this.deductionService.loadDeduction(this.orgId)
      .then((result: any): any => {
        this.deductions = result?.data;
        this.dataSource = new MatTableDataSource<DeductionInfo>(
          this.deductions
        );
        this.count = result?.data?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getSysInflunes() {
    this.sysInfluneService.get(this.orgId)
      .then((result: any): any => {
        this.sysInflunes = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    this.submitted = false
    if (this.DeductionForm.value) {
      this.add();
    }
    else
      this.submitted = true;
  }

  add() {
    const newdeduction = this.DeductionForm.value;
    this.deductionService.addDeduction(newdeduction)
      .then(result => {
        console.log('Deduction added successfully:', result);
        this.toastrService.success('Deduction added successfully');
        this.get();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding deduction. Please try again.';
      })
  }

  update(recordDate: DeductionInfo) {
    console.log(this.DeductionForm.value);

    const updatededuction = {
      id: recordDate.payDeductId,
      active: recordDate.active
    }
    this.deductionService.updateDeduction(updatededuction)
      .then(result => {
        console.log('deduction updated successfully:', result);
        this.toastrService.success('deduction updated successfully');
        this.get();
        this.reset();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error updating deduction. Please try again.';
      })
  }

  passData(row: any) {
    this.deduction = row;
    this.initForm();
  }

  reset() {
    this.deduction = {
      orgId: this.orgId,
      payDeductId: 0,
      deductionName: '',
      deductionDesc: '',
      refrence: '',
      sysInfID: null,
      active: true,
      dateCreated: '',
      dateUpdated: ''
    };
    this.submitted = false;
    this.initForm();
  }
}
