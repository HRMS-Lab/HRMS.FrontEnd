import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { EmployeeInfo } from '../../../../pages/ecommerce-page/e-orders/models/employee.model';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  employeeDetails: EmployeeInfo;
  orgId: number;
  id: number;
  // Star Rating
  selectedRating: number = 2;
  tokenObj: any;
  // Input Counter
  value = 1;

  ngOnInit(): void {
    this.getOrgIdAndEmployeeId();
  }

  // isToggled
  isToggled = false;

  constructor(
    public themeService: CustomizerSettingsService,
    private _productService: EmployeeService,
    private route: ActivatedRoute
  ) {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  getOrgIdAndEmployeeId() {
    this.route.params.subscribe((params) => {
      //this.orgId = params['orgId'];
      this.id = params['id'];
      this.getEmployeeById();
    });
  }
  getEmployeeById() {
    if (this.orgId && this.id) {
      this._productService
        .loadEmployeesById(this.id)
        .then((organizationInfo: any): any => {
          this.employeeDetails = organizationInfo?.data[0];
        })
        .catch((error): any => { });
    }
  }
}
