import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_FORMATS, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from '../../services/contract.service';
import { ProjectService } from '../../../../lookup/services/project.service';
import { ProjectInfo } from '../../../../lookup/models/Project.model';
import { SharedService } from '../../../../shared/services/shared.service';
import { EmployeeProjectInfoList } from '../../../employee-management/models/employee-project.model';
import { EmployeeProjectService } from '../../../employee-management/services/employee-project.service';
import { TemplateService } from '../../services/template.service';
import { TemplateInfo } from '../../models/template.model';
import { DeductionService } from '../../services/deduction.service';
import { EarningService } from '../../services/earning.service';
import { DeductionInfo } from '../../models/deduction.model';
import { EarningInfo } from '../../models/earning.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-contract-form',
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
    GetItemNamePipe,
    MatDatepickerModule,

  ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.scss',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class ContractFormComponent {

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private sharedService = inject(SharedService);
  private projectService = inject(ProjectService);
  private employeeProjectService = inject(EmployeeProjectService);
  private templateService = inject(TemplateService);
  private deductionService = inject(DeductionService);
  private earningService = inject(EarningService);
  private contractService = inject(ContractService);

  deductionDataSource = new MatTableDataSource<any>();
  earningDataSource = new MatTableDataSource<any>();

  orgId: number;
  Form: FormGroup;
  projects: ProjectInfo[];
  employeeProjectList: EmployeeProjectInfoList[];
  templates: TemplateInfo[];
  deductions: DeductionInfo[];
  earnings: EarningInfo[];
  selectedProject: any;
  templateInfo: any;
  submitted: boolean;
  displayedColumns: string[] = [
    'name',
    'amount'
  ];

  ngOnInit(): void {
    this.orgId = this.sharedService.getOrgId();
    this.initForm();
    this.getProjects();
    this.getTemplates();
  }


  initForm() {
    this.Form = this.fb.group({
      employeeID: ['', [Validators.required]],
      payTempHeadID: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      descrption: [''],
      active: [true],
      lines: [null],
    });
  }

  getProjects() {
    this.projectService.loadProjects(this.orgId).then((result: any): any => {
      this.projects = result?.data;
    })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEmployeesProject(event: any) {
    console.log(event);
    this.employeeProjectList = [];
    this.employeeProjectService
      .loadEmployeeProject(undefined, event.value, undefined)
      .then((result: any): any => {
        console.log(result);

        if (result?.data.length > 0)
          this.employeeProjectList = result?.data;
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  getTemplates() {
    this.templateService.get(this.orgId)
      .then((result: any): any => {
        //this.templates = result?.data;
        console.log(this.templates);
        this.templates = this.groupByPayTempHead(result?.data)
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  groupByPayTempHead(items: any[]): any[] {
    if (!items || !items.length) return [];

    const groupedMap = new Map<number, any>();

    items.forEach(item => {
      if (!groupedMap.has(item.payTempHeadId)) {
        // Create new group with header info
        groupedMap.set(item.payTempHeadId, {
          payTempHeadId: item.payTempHeadId,
          orgId: item.orgId,
          templateName: item.templateName,
          templateDesc: item.templateDesc,
          refrence: item.refrence,
          active: item.active,
          headerDateCreated: item.headerDateCreated,
          headerDateUpdated: item.headerDateUpdated,
          deduction: [],
          earning: []
        });
      }

      const group = groupedMap.get(item.payTempHeadId);

      // Add the line item to the appropriate array
      if (item.influncetype === 'Deduction') {
        group.deduction.push({
          payTempLinesID: item.payInfID,
          amountTemp: item.amount,
          amount: item.amount
        });
      } else if (item.influncetype === 'Earning') {
        group.earning.push({
          payTempLinesID: item.payInfID,
          amountTemp: item.amount,
          amount: item.amount
        });
      }
    });

    // Convert the map values to an array
    const result = Array.from(groupedMap.values());
    console.log(result);

    return Array.from(groupedMap.values());
  }

  getTemplateInfo(event: any) {
    this.getDeductions();
    this.getEarning();

    this.templateInfo = this.templates.find(t => t.payTempHeadId == event.value);
    this.deductionDataSource = new MatTableDataSource<any>(
      this.templateInfo.deduction
    );
    this.earningDataSource = new MatTableDataSource<any>(
      this.templateInfo.earning
    );
  }

  getDeductions() {
    if (this.deductions != undefined && this.deductions.length > 0)
      return;

    this.deductionService.loadDeduction(this.orgId)
      .then((result: any): any => {
        this.deductions = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEarning() {
    if (this.earnings != undefined && this.earnings.length > 0)
      return;

    this.earningService.loadEarning(this.orgId)
      .then((result: any): any => {
        // this.earnings = result?.data.filter((a: EarningInfo) => a.active == true);
        this.earnings = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.templateInfo.deduction.length > 0 || this.templateInfo.earning.length > 0) {
      this.Form.controls['lines'].patchValue([
        ...this.templateInfo.deduction,
        ...this.templateInfo.earning
      ]);
    }

    const newContract = this.Form.value;
    newContract.startDate = moment(newContract.startDate).format('yyyy-MM-DD');
    newContract.endDate = moment(newContract.endDate).format('yyyy-MM-DD');
    console.log(newContract);

    this.contractService.create(newContract)
      .then((result: any): any => {
        console.log(result);
        this.reset();
        this.toastrService.success('Contract added successfully');
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  reset() {
    this.selectedProject = null;
    this.templateInfo.deduction = [];
    this.deductionDataSource = new MatTableDataSource<any>(
      this.templateInfo.deduction
    );
    this.templateInfo.earning = [];
    this.earningDataSource = new MatTableDataSource<any>(
      this.templateInfo.earning
    );

    this.initForm();
  }
}
