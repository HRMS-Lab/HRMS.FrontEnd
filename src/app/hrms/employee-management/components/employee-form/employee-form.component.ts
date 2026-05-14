import { CommonModule, NgFor } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FileUploadControl, FileUploadModule, FileUploadValidators } from '@iplab/ngx-file-upload';
import { jwtDecode } from 'jwt-decode';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { ProjectComponent } from "../project/project.component";
import { AttachmentComponent } from "../attachment/attachment.component";
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { DynnamicWizardComponent } from '../../../../forms/wizard/dynnamic-wizard/dynnamic-wizard.component';
import { TitlesInfo, EmployeeInfo } from '../../../../pages/ecommerce-page/e-orders/models/employee.model';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';
import { OragnizationInfo, DepartmentInfo } from '../../../../pages/ecommerce-page/e-products-list/models/products.model';
import { ProductsService } from '../../../../pages/ecommerce-page/e-products-list/service/products.service';
import { AttechmentService } from '../../services/attechment.service';
import { AddressComponent } from '../address/address.component';
import { EmployeeInternalService } from '../../services/employee.service';
import { EmployeeCounts } from '../../models/employee.model';
import { data } from '../../../../apexcharts/area-charts/datetime-area-chart/series-data';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    NgFor,
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
    CommonModule,
    MatCheckboxModule,
    MatOptionModule,
    MatExpansionModule,
    MatStepperModule,
    AddressComponent,
    ProjectComponent,
    AttachmentComponent
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  organizations: OragnizationInfo[] = [];
  departments!: DepartmentInfo[];
  titles!: TitlesInfo[];
  employeeCounts: EmployeeCounts;
  isToggled = false;
  isLoading: boolean = false; // Loading indicator state
  errorMessage: string = ''; // Error message state
  employees: EmployeeInfo;
  employeeId: any;
  orgId: number;
  id: number;
  editMode: boolean = false;
  wizardSteps: any[] = [];
  attechmentsTypes: any[] = [];
  tokenObj: any;
  today:Date=new Date();
  genderList = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" }
  ]

  public fileUploadControl = new FileUploadControl(
    // control configuration
    { accept: ['image/*'], multiple: false },

    // validator used to discard files
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.fileSize(80000)]
  );

  get employeeName() {
    return this.employeeForm.get('employeeName');
  }
  get employeeDescription() {
    return this.employeeForm.get('employeeDescription');
  }

  get refrence1() {
    return this.employeeForm.get('refrence1');
  }

  get refrence2() {
    return this.employeeForm.get('refrence2');
  }

  get refrence3() {
    return this.employeeForm.get('refrence3');
  }

  get refrence4() {
    return this.employeeForm.get('refrence4');
  }

  get refrence5() {
    return this.employeeForm.get('refrence5');
  }
  @ViewChild('step1Content') step1Content!: TemplateRef<any>;
  @ViewChild('step2Content') step2Content!: TemplateRef<any>;
  constructor(
    public themeService: CustomizerSettingsService,
    private _employeeService: EmployeeService,
    private employeeService: EmployeeInternalService,
    private _productService: ProductsService,
    private _attechmentService: AttechmentService,
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

    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    //this.loadOrganiztionOrg();
    this.getOrgIdAndemployeeId();
    this.loadDepartments();
    this.loadTitles();
    this.loadEmployeeCounts();
    this.loadAttechment();
    this.initForm();
    this.wizardSteps = [
      { label: 'Create Employee', content: this.step1Content },
      { label: 'Create Attachment', content: this.step2Content },
      // { label: 'Create Attachment', content: this.step2Content },
    ];
  }
  // async loadOrganiztionOrg(): Promise<void> {
  //   this._productService
  //     .loadOrganization()
  //     .then((organizationInfo: any): any => {
  //       this.organizations = organizationInfo?.data;
  //       this.orgId = organizationInfo?.data?.[0].orgId;
  //       if (this.orgId) {
  //         this.loadDepartments();
  //       }
  //     })
  //     .catch((error): any => { });
  // }
  async loadDepartments(): Promise<void> {
    this._productService
      .loadDepartments(this.orgId)
      .then((departmentInfo: any): any => {
        this.departments = departmentInfo?.data;
      })
      .catch((error): any => {
        console.error('Error loading Department:', error);
      });
  }
  async loadTitles(): Promise<void> {
    this._employeeService
      .loadTitles()
      .then((titlesInfo: any): any => {
        this.titles = titlesInfo?.data;
      })
      .catch((error): any => {
        console.error('Error loading Tiltes:', error);
      });
  }
  async loadAttechment(): Promise<void> {
    this._attechmentService
      .loadAttachmemtsTypes(this.orgId)
      .then((AttachmentInfo: any): any => {
        this.attechmentsTypes = AttachmentInfo?.data;

      })
      .catch((error: any): any => {
        console.error('Error loading Department:', error);
      });
  }
  async loadEmployeeCounts(): Promise<void> {
    this.employeeService
      .loadEmployeeCounts(this.orgId)
      .then((result: any): any => {
        this.employeeCounts = result?.data[0];
        this.employeeCounts.employeeIDLastId = (parseInt(this.employeeCounts.employeeIDLastId) + 1).toString();
        console.log(this.employeeCounts);
      })
      .catch((error: any): any => {
        console.error('Error loading Department:', error);
      });
  }
  getOrgIdAndemployeeId() {
    this.route.params.subscribe((params) => {
      //this.orgId = params['orgId'];
      this.id = params['id'];
      this.editMode = (this.id != undefined) ? true : false;
      this.getemployeeById();
    });
  }
  getemployeeById() {
    if (this.orgId && this.id) {
      this._employeeService
        .loadEmployeesById(this.id)
        .then((organizationInfo: any): any => {
          this.employees = organizationInfo?.data[0];
          this.initForm();
        })
        .catch((error): any => { });
    }
  }
  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
  initForm() {
    this.employeeForm = this.fb.group({
      fullName: [this.employees?.fullName ?? '', [Validators.required]],
      gender: [this.employees?.gender ?? '', [Validators.required]],
      email: [
        this.employees?.email ?? '',
        [Validators.required, Validators.email],
      ],
      phone: [
        this.employees?.phone ?? null,
        [Validators.required, this.phoneNumberValidator],
      ],
      nationalId: [
        this.employees?.nationalId ?? null,
        [Validators.required, this.nationalIdValidator],
      ],
      hireDate: [this.employees?.hireDate ?? '', [Validators.required]],
      birthDate: [this.employees?.birthDate ?? '', [Validators.required]],
      departmentId: [
        this.employees?.departmentId ?? null,
        [Validators.required],
      ],
      orgId: [this.orgId ?? null, [Validators.required]],
      titleId: [this.employees?.titleId ?? null, [Validators.required]],
      bankAccount: [
        this.employees?.bankAccount ?? '',
        [Validators.required],
      ],
      bankName: [this.employees?.bankName ?? '', [Validators.required]],
      refrence1: [this.employees?.refrence1 ?? ''],
      refrence2: [this.employees?.refrence2 ?? ''],
      refrence3: [this.employees?.refrence3 ?? ''],
      refrence4: [this.employees?.refrence4 ?? ''],
      refrence5: [this.employees?.refrence5 ?? ''],
      refrence6: [this.employees?.refrence6 ?? ''],
      refrence7: [this.employees?.refrence7 ?? ''],
      refrence8: [this.employees?.refrence8 ?? ''],
      refrence9: [this.employees?.refrence9 ?? ''],
      refrence10: [this.employees?.refrence10 ?? ''],
      active: [this.employees?.active ?? true],
    });
  }
  // Custom validator for account number (12 digits)
  accountNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const isValid = /^[0-9]{12}$/.test(control.value);
    return isValid ? null : { invalidAccountNumber: true };
  }

  // Custom validator for national ID (12 numbers)
  nationalIdValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const isValid = /^[0-9]{14}$/.test(control.value);
    return isValid ? null : { invalidNationalId: true };
  }

  // Custom validator for phone number (basic validation)
  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const isValid = /^[0-9]{10,15}$/.test(control.value); // Adjust regex as needed for phone validation
    return isValid ? null : { invalidPhoneNumber: true };
  }
  getFieldType(key: string): string {
    switch (key) {
      case 'hireDate':
      case 'birthDate':
        return 'date';
      case 'accountNumber':
        return 'number';
      case 'nationalId':
        return 'text';
      // Define other types accordingly...
      default:
        return 'text';
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.editMode) {
        // Set loading to true when submission starts
        this.isLoading = true;
        this.updateemployee();
      } else {
        // Set loading to true when submission starts
        this.isLoading = true;
        this.addemployee();
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  async addemployee() {
    const newemployee = this.employeeForm.value;
    try {
      debugger;
      const result: any = await this._employeeService.addEmployee(newemployee);
      console.log('employee added successfully:', result);
      this.employeeId = result.data[0].employeeId;
      this.toastrService.success('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
      this.errorMessage = 'Error adding employee. Please try again.';
    } finally {
      // Set loading to false when submission is complete (success or error)
      this.isLoading = false;
    }
  }
  getInfoFields() {
    return [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'input',
        placeholder: 'Enter Full Name',
        inputType: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'input',
        placeholder: 'Enter Email',
        inputType: 'email',
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'input',
        placeholder: 'Enter Phone Number',
        inputType: 'tel',
      },
      {
        name: 'nationalId',
        label: 'National ID',
        type: 'input',
        placeholder: 'Enter National ID',
        inputType: 'text',
      },
      {
        name: 'hireDate',
        label: 'Hire Date',
        type: 'date',
        placeholder: 'Select Hire Date',
      },
      {
        name: 'birthDate',
        label: 'Birth Date',
        type: 'date',
        placeholder: 'Select Birth Date',
      },
      {
        name: 'departmentId',
        label: 'Department',
        type: 'select',
        options: this.departments.map((d) => ({
          value: d.departmentId,
          label: d.departmentName,
        })),
      },
      // {
      //   name: 'orgId',
      //   label: 'Organization',
      //   type: 'select',
      //   options: this.organizations.map((o) => ({
      //     value: o.orgId,
      //     label: o.orgName,
      //   })),
      // },
      {
        name: 'titleId',
        label: 'Title',
        type: 'select',
        options: this.titles.map((t) => ({
          value: t.titleId,
          label: t.titleName,
        })),
      },
      {
        name: 'bankAccount',
        label: 'Bank Account',
        type: 'input',
        placeholder: 'Enter Bank Account',
        inputType: 'text',
      },
      {
        name: 'bankName',
        label: 'Bank Name',
        type: 'input',
        placeholder: 'Enter Bank Name',
        inputType: 'text',
      },
      {
        name: 'refrence1',
        label: 'Reference 1',
        type: 'input',
        placeholder: 'Enter Reference 1',
        inputType: 'text',
      },
      // Add other references if needed
      { name: 'active', label: 'Active', type: 'checkbox' },
    ];
  }
  async updateemployee() {
    const newemployee = this.employeeForm.value;
    try {
      const result = await this._employeeService.updateEmployee(
        this.employees?.employeeId,
        newemployee
      );

      this.toastrService.success('Employee updated successfully');
      this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      this.errorMessage = 'Error adding employee. Please try again.';
    } finally {
      // Set loading to false when submission is complete (success or error)
      this.isLoading = false;
    }
  }

  onStepChange(stepIndex: number) {
    console.log('Current step:', stepIndex);
  }

  //#region Attachments
  attachmentList: any[] = [];
  attachTypeID: any;
  attchErrMsg: any;

  async addAttachment() {
    if (this.fileUploadControl.value == undefined || this.attachTypeID == undefined) {
      this.attchErrMsg = 'Please select type and file';
      return;
    }

    //const file = this.fileUploadControl.get('file')?.value[0];
    const attachments = this.fileUploadControl.value;
    if (attachments && attachments.length > 0) {
      const base64Promises = attachments
        .filter((file: any) => file instanceof File)
        .map((file: File) => this.convertToBase64(file));

      let bytesArray = await this.convertFileToBytes(attachments[0]);

      Promise.all(base64Promises).then((base64Files: any[]) => {
        let obj = {
          typeId: this.attachTypeID,
          src: base64Files,
          bytes: bytesArray
        }
        this.attachmentList.push(obj);
        this.attchErrMsg = '';
        this.fileUploadControl.setValue([]);
      });
    }
  }
  // Convert a file to Base64
  convertToBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);  // Base64 encoded string
      reader.onerror = error => reject(error);
    });
  }
  convertFileToBytes(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const byteArray = new Uint8Array(e.target.result); // Get byte array from ArrayBuffer
        resolve(byteArray); // Resolve the promise with the byte array
      };
      reader.onerror = (error) => {
        reject(error); // Reject the promise if an error occurs
      };
      reader.readAsArrayBuffer(file); // Start reading the file as ArrayBuffer
    });
  }
  createAttechment(): void {
    this.attachmentList.forEach(element => {
      let formData: any = {
        attachTypeID: element.typeId,
        employeeId: this.employeeId,
        active: true,
        attachment: element.bytes // Add attachments as base64 strings here if needed
      };

      this._attechmentService.addAttachmemt(formData).then(() => {
        console.log('create attachment successfully');
        this.toastrService.success('create attachment successfully');
      }).catch((error) => {
        this.errorMessage = 'Error adding Attechment.';
      }).finally(() => {
        this.isLoading = false;
      });
    });
  }

  //#endregion

  //#region Address
  nextStep(stepper: MatStepper) {
    stepper.next();
  }
  previousStep(stepper: MatStepper) {
    stepper.previous();
  }
  finishStep() {
    this.router.navigate(['/hrms/employee-management/employees']);
  }
  //#endregion
}
