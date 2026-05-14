import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ContractInfo } from '../../models/contract.model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/services/shared.service';
import { ContractService } from '../../services/contract.service';
import { MatIconModule } from '@angular/material/icon';
import { PeriodicElement } from '../templates/templates.component';
import { DeductionInfo } from '../../models/deduction.model';
import { EarningInfo } from '../../models/earning.model';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TemplateInfo } from '../../models/template.model';
import { TemplateService } from '../../services/template.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeductionService } from '../../services/deduction.service';
import { EarningService } from '../../services/earning.service';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    GetItemNamePipe
  ],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})

export class ContractsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ContractInfo>();

  private toastrService = inject(ToastrService);
  private sharedService = inject(SharedService);
  private templateService = inject(TemplateService);
  private contractService = inject(ContractService);
  private deductionService = inject(DeductionService);
  private earningService = inject(EarningService);

  contracts: ContractInfo[];
  templates: TemplateInfo[];
  expandedElement: any | null;
  deductions: DeductionInfo[];
  earnings: EarningInfo[];

  orgId: number;
  errorMsg: string;
  pageNumber: number = 1;
  pageSize: number = 10;
  count: number;
  displayedColumns: string[] = [
    'employeeName',
    'contractDesc',
    'startDate',
    'endDate',
    'expand'
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  ngOnInit(): void {
    this.orgId = this.sharedService.getOrgId();
    this.getTemplates();
    this.getDeductions();
    this.getEarning();
  }

  getTemplates() {
    this.templateService.get(this.orgId)
      .then((result: any): any => {
        //this.templates = result?.data;
        console.log(this.templates);
        this.templates = this.sharedService.groupByPayTempHead(result?.data)
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getDeductions() {
    this.deductionService.loadDeduction(this.orgId)
      .then((result: any): any => {
        this.deductions = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEarning() {
    this.earningService.loadEarning(this.orgId)
      .then((result: any): any => {
        this.earnings = result?.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getContracts(event: any) {
    this.contractService.get(this.orgId, event.value)
      .then((result: any): any => {
        result.data.forEach((item: any) => {
          if (item.contractLinesjson) {
            item.contractLinesjson = JSON.parse(item.contractLinesjson);
          }
        });
        this.contracts = result?.data;
        console.log(this.contracts);

        this.dataSource = new MatTableDataSource<ContractInfo>(
          this.contracts
        );
        this.count = this.contracts?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: any) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: any) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
