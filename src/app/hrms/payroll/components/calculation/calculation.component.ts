import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/services/shared.service';
import { CalculationService } from '../../services/calculation.service';
import { CalculationHeaderInfo, CalculationInfo, CalculationPayload } from '../../models/calculation.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-calculation',
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
    MatPaginatorModule,
  ],
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.scss'
})
export class CalculationComponent {
  @ViewChild('submitForm') submitForm: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private sharedService = inject(SharedService);
  private calculationService = inject(CalculationService);

  dataSource = new MatTableDataSource<CalculationInfo>();

  orgId: number;
  Form: FormGroup;
  months: number[] = [];
  years: number[] = [];
  submitted: boolean;
  headerInfo: CalculationHeaderInfo;
  calculationInfo: CalculationInfo[];

  pageNumber: number = 1;
  pageSize: number = 10;
  count: number;
  displayedColumns: string[] = [
    'empName',
    'grossSalary',
    'totalEarning',
    'totalDeduction',
    'netSalary',
  ];

  ngOnInit(): void {
    this.orgId = this.sharedService.getOrgId();
    for (let index = 0; index < 12; index++) {
      this.months.push(index + 1);
    }
    for (let index = 0; index < 10; index++) {
      this.years.push(2023 + index);
    }

    this.initForm();
  }

  initForm() {
    this.Form = this.fb.group({
      orgID: [this.orgId],
      description: [null, [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = false;
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }
    const newCalculationHeader = this.Form.value;
    console.log(newCalculationHeader);

    this.calculationService.createHeader(newCalculationHeader)
      .then((result: any): any => {
        console.log(result);
        this.calculationInfo = result?.data;
        this.dataSource = new MatTableDataSource<CalculationInfo>(
          this.calculationInfo
        );
        this.count = this.calculationInfo?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  createCalculation() {
    if (this.headerInfo.newPayClacHeaderID != undefined) {
      const newCalculation = {} as CalculationPayload;
      newCalculation.payClacHeaderID = this.headerInfo.newPayClacHeaderID;

      this.calculationService.createCalculation(newCalculation)
        .then((result: any): any => {
          console.log(result);
          this.calculationInfo = result?.data?.data;
          this.dataSource = new MatTableDataSource<CalculationInfo>(
            this.calculationInfo
          );
          this.count = this.calculationInfo?.length;
          this.dataSource.paginator = this.paginator;
        })
        .catch((error): any => {
          console.log(error);
        });
    }
  }

  reset() {
    this.submitForm.resetForm();
  }
}
