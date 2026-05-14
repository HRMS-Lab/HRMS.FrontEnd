import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TemplateInfo } from '../../models/template.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from '../../services/template.service';
import { jwtDecode } from 'jwt-decode';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeductionService } from '../../services/deduction.service';
import { DeductionInfo } from '../../models/deduction.model';
import { EarningService } from '../../services/earning.service';
import { EarningInfo } from '../../models/earning.model';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';

@Component({
  selector: 'app-templates',
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
    GetItemNamePipe
  ],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<TemplateInfo>();

  private toastrService = inject(ToastrService);
  private templateService = inject(TemplateService);
  private deductionService = inject(DeductionService);
  private earningService = inject(EarningService);

  templates: TemplateInfo[];
  //expandedElement: any | null;
  displayedColumns: string[] = [
    'templateName',
    'templateDesc',
    'refrence',
    'active',
    'expand'
  ];
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;
  deductions: DeductionInfo[];
  earnings: EarningInfo[];

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
    this.get();
    this.getDeductions();
    this.getEarning();
  }

  get() {
    this.templateService.get(this.orgId)
      .then((result: any): any => {
        //this.templates = result?.data;
        console.log(this.templates);
        this.templates = this.groupByPayTempHead(result?.data)
        this.dataSource = new MatTableDataSource<TemplateInfo>(
          this.templates
        );
        this.count = this.templates?.length;
        this.dataSource.paginator = this.paginator;
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
          payInfID: item.payInfID,
          amount: item.amount
        });
      } else if (item.influncetype === 'Earning') {
        group.earning.push({
          payInfID: item.payInfID,
          amount: item.amount
        });
      }
    });

    // Convert the map values to an array
    const result = Array.from(groupedMap.values());
    console.log(result);

    return Array.from(groupedMap.values());
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: any) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: any) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  update(recordDate: TemplateInfo) {
    const updateEarning = {
      id: recordDate.payTempHeadId,
      active: recordDate.active
    }
    this.templateService.update(updateEarning)
      .then(result => {
        console.log('Template updated successfully:', result);
        this.toastrService.success('Template updated successfully');
        this.get();
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = 'Error updating Template. Please try again.';
      })
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];
