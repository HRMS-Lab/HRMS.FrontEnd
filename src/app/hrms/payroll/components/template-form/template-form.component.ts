import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from '../../services/template.service';
import { PayrollTemplateLine, TemplateInfo } from '../../models/template.model';
import { DeductionService } from '../../services/deduction.service';
import { EarningService } from '../../services/earning.service';
import { DeductionInfo } from '../../models/deduction.model';
import { EarningInfo } from '../../models/earning.model';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';

@Component({
  selector: 'app-template-form',
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
    MatIconModule,
    GetItemNamePipe
  ],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss'
})
export class TemplateFormComponent {

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private templateService = inject(TemplateService);
  private deductionService = inject(DeductionService);
  private earningService = inject(EarningService);

  deductionDataSource = new MatTableDataSource<any>();
  earningDataSource = new MatTableDataSource<any>();

  Form: FormGroup;
  info: TemplateInfo;
  lines: PayrollTemplateLine[];
  deductions: DeductionInfo[];
  earnings: EarningInfo[];
  displayedColumns: string[] = [
    'name',
    'amount',
    'remove'
  ];
  selectedDeduction: any;
  selectedEarning: any;
  deductionList: any[] = [];
  earningList: any[] = [];

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
    this.getDeduction();
    this.getEarning();
  }

  initForm() {
    this.Form = this.fb.group({
      orgId: [this.orgId],
      templateName: [this.info?.templateName ?? '', [Validators.required]],
      templateDesc: [this.info?.templateDesc ?? '', [Validators.required]],
      refrence: [this.info?.refrence ?? ''],
      payrollTemplateLines: [this.lines ?? null],
    });
  }

  getDeduction() {
    this.deductionService.loadDeduction(this.orgId)
      .then((result: any): any => {
        this.deductions = result?.data.filter((a: DeductionInfo) => a.active == true);
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEarning() {
    this.earningService.loadEarning(this.orgId)
      .then((result: any): any => {
        this.earnings = result?.data.filter((a: EarningInfo) => a.active == true);
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  addDeduction() {
    if (this.selectedDeduction == undefined)
      return;

    let isExist = this.deductionList.find(d => d.payInfID == this.selectedDeduction);
    if (isExist != undefined) {
      this.selectedDeduction = null;
      return;
    }

    let deductionObj = {
      payInfID: this.selectedDeduction,
      amount: 0
    };
    this.deductionList.push(deductionObj);
    this.deductionDataSource = new MatTableDataSource<any>(
      this.deductionList
    );
    this.selectedDeduction = null;
  }

  removeDeduction(index: number) {
    this.deductionList.splice(index, 1);
    this.deductionDataSource = new MatTableDataSource<any>(
      this.deductionList
    );
  }

  addEarning() {
    if (this.selectedEarning == undefined)
      return;

    let isExist = this.earningList.find(d => d.payInfID == this.selectedEarning);
    if (isExist != undefined) {
      this.selectedEarning = null;
      return;
    }

    let earningObj = {
      payInfID: this.selectedEarning,
      amount: 0
    };
    this.earningList.push(earningObj);
    this.earningDataSource = new MatTableDataSource<any>(
      this.earningList
    );
    this.selectedEarning = null;
  }

  removeEarning(index: number) {
    this.earningList.splice(index, 1);
    this.earningDataSource = new MatTableDataSource<any>(
      this.earningList
    );
  }

  onSubmit() {
    if (this.earningList.length > 0 || this.deductionList.length > 0) {
      this.Form.controls['payrollTemplateLines'].patchValue([
        ...this.earningList,
        ...this.deductionList
      ]);
    }

    console.log(this.Form.value);
    this.templateService.create(this.Form.value)
      .then(result => {
        console.log('Template added successfully:', result);
        this.toastrService.success('Template added successfully');
        this.reset();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error adding Template. Please try again.';
      })
  }

  reset() {
    this.deductionList = [];
    this.deductionDataSource = new MatTableDataSource<any>(
      this.deductionList
    );
    this.earningList = [];
    this.earningDataSource = new MatTableDataSource<any>(
      this.earningList
    );
    this.initForm();
  }
}
