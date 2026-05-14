import { NgIf, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Validators } from 'ngx-editor';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AdressesInfo } from '../../../../pages/ecommerce-page/adresses/models/adresses.model';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { AdressesService } from '../../../../pages/ecommerce-page/adresses/services/adresses.service';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';
import { RegoinService } from '../../../../pages/ecommerce-page/regoins/services/regoins.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxEditorModule,
    MatCheckboxModule,
    MatOptionModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  @Input() createEmployeeForm: boolean = false;
  @Input() employeeFormId: number;
  @Output() formEmployeeNext = new EventEmitter();
  @Output() formEmployeePrevious = new EventEmitter();

  AddressForm: FormGroup;
  isToggled = false;
  employees: any[] = [];
  regions: any[] = [];
  isLoading: boolean = false;
  addressErrorMsg: string = '';
  empId: number;
  editMode: boolean = false;
  addresses: AdressesInfo;
  tokenObj: any;
  orgId: number;
  employee: any = {
    id: 0,
    name: ''
  }

  constructor(
    public themeService: CustomizerSettingsService,
    private addressService: AdressesService,
    private employeeService: EmployeeService,
    private regoinService: RegoinService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.route.params.subscribe((params) => {
      this.empId = params['id'];
    });

    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    //this.loadEmployees();
    //this.getOrgIdAndAdressId();
    this.getRegions();
    this.getEmployeeById();
    this.initForm();
  }

  getRegions() {
    this.regoinService.loadRegoinsById(this.orgId).then((result: any): any => {
      this.regions = result?.data;
    })
      .catch((error): any => {
        console.log(error);
      });
  }

  getEmployeeById() {
    if (this.createEmployeeForm)
      return;

    this.employeeService
      .loadEmployeesById(this.empId)
      .then((result: any): any => {
        console.log('in emlotesee', result);
        if (result?.data.length > 0) {
          this.employee.id = result?.data[0].employeeId;
          this.employee.name = result?.data[0].fullName;
          this.getEmployeeAddress();
        }
        else
          this.toastrService.error('No employee found');
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  getEmployeeAddress() {
    this.editMode = false;
    this.addressService.loadAAdresssById(this.orgId, this.empId)
      .then((result: any): any => {
        console.log('in emlotesee', result);
        if (result?.data.length > 0) {
          this.editMode = true;
          this.addresses = result?.data[0];
          this.initForm();
        }
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  // getOrgIdAndAdressId() {
  //   this.route.params.subscribe((params) => {
  //     // this.id = params['id'];
  //     this.empId = params['id'];
  //     this.editMode = params['editMode'];
  //     this.getAdressById();
  //   });
  // }
  // getAdressById() {
  //   if (this.orgId) {
  //     this.regoinService
  //       .loadRegoinsById(this.orgId)
  //       .then((organizationInfo: any): any => {
  //         this.addresses = organizationInfo?.data.find((val: any) => {
  //           if (val.empId == this.empId) {
  //             return val;
  //           }
  //         });

  //         this.initForm();
  //       })
  //       .catch((error): any => { });
  //   }
  // }
  // loadEmployees() {
  //   this.employeeService
  //     .loadEmployees(1, 10)
  //     .then((EmployeeInfo: any): any => {
  //       console.log('in emlotesee', EmployeeInfo);
  //       this.employees = EmployeeInfo?.data;
  //     })
  //     .catch((error): any => {
  //       console.error('Error loading Employee:', error);
  //     });
  // }

  // onEmployeeChange(orgId: number) {
  //   this.regoinService
  //     .loadRegoinsById(orgId)
  //     .then((EmployeeInfo: any): any => {
  //       this.regions = EmployeeInfo?.data;
  //     })
  //     .catch((error): any => {
  //       console.error('Error loading Employee:', error);
  //     });
  // }

  initForm() {
    this.AddressForm = this.fb.group({
      employeeId: [
        this.createEmployeeForm ? this.employeeFormId : this.empId ?? null,
        [Validators.required],
      ],
      address: [this.addresses?.address ?? '', [Validators.required]],
      regionId: [this.addresses?.regionId ?? null, [Validators.required]],
      city: [this.addresses?.city ?? '', [Validators.required]],
      state: [this.addresses?.state ?? '', [Validators.required]],
      zipCode: [this.addresses?.zipCode ?? '', [Validators.required]],
      refrence1: [this.addresses?.refrence1 ?? ''],
      refrence2: [this.addresses?.refrence2 ?? ''],
      refrence3: [this.addresses?.refrence3 ?? ''],
      refrence4: [this.addresses?.refrence4 ?? ''],
      refrence5: [this.addresses?.refrence5 ?? ''],
      active: [this.addresses?.active ?? true],
    });
  }

  onSubmit() {
    if (this.AddressForm.valid) {
      this.isLoading = true;
      if (this.editMode) {
        this.updateAddress();
      } else {
        this.addAddress();
      }
    } else {
      this.addressErrorMsg = 'Please fill in all required fields correctly.';
    }
  }

  async addAddress() {
    const newAddress = this.AddressForm.value;
    try {
      const result = await this.addressService.addAdress(newAddress);
      console.log('Address added successfully:', result);
      this.toastrService.success('Address added successfully');
      if (!this.createEmployeeForm)
        this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      console.error('Error adding address:', error);
      this.addressErrorMsg = 'Error adding address. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async updateAddress() {
    const updatedAddress = this.AddressForm.value;
    try {
      const result = await this.addressService.updateAdress(
        this.addresses.addressId,
        updatedAddress
      );
      console.log('Address updated successfully:', result);
      this.toastrService.success('Address updated successfully');
      this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      console.error('Error updating address:', error);
      this.addressErrorMsg = 'Error updating address. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  formEmployeeNextFn() {
    this.formEmployeeNext.emit();
  }

  formEmployeePreviousFn() {
    this.formEmployeePrevious.emit();
  }
}

