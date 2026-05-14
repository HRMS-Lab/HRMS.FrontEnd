import { Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeProjectService } from '../../services/employee-project.service';
import { jwtDecode } from 'jwt-decode';
import { AttachmentInfo } from '../../models/attechment.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadControl, FileUploadModule, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { GetItemNamePipe } from '../../../../core/pipes/get-item-name.pipe';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { EmployeeService } from '../../../../pages/ecommerce-page/e-orders/services/employee.service';
import { AttechmentService } from '../../services/attechment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attachment',
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
    FileUploadModule,
    GetItemNamePipe,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss'
})
export class AttachmentComponent implements OnInit {
  @Input() createEmployeeForm: boolean = false;
  @Input() employeeFormId: number;
  @Output() formEmployeeNext = new EventEmitter();
  @Output() formEmployeePrevious = new EventEmitter();

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private employeeProjectService = inject(EmployeeProjectService);
  private employeeService = inject(EmployeeService);
  private attechmentService = inject(AttechmentService);
  private toastrService = inject(ToastrService);
  public themeService = inject(CustomizerSettingsService);
  private router = inject(Router);

  public fileUploadControl = new FileUploadControl(
    { accept: ['image/*'], multiple: false },  // control configuration
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.fileSize(80000)]    // validator used to discard files
  );

  tokenObj: any;
  orgId: number;
  empId: number;
  isToggled = false;
  editMode: boolean = false;

  AttachmentForm: FormGroup;
  attachments: AttachmentInfo;
  attechmentsTypes: any[] = [];
  attachmentList: any[] = [];
  employeeAttachments: AttachmentInfo[] = [];
  attachTypeID: any;
  attchErrMsg: any;
  employee: any = {
    id: 0,
    name: ''
  }
  refrenceCount = Array.from({ length: 5 }, (_, i) => i + 1);

  ngOnInit(): void {
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

    this.initForm();
    this.loadAttechmentType();
    this.getEmployeeById();
  }

  initForm() {
    debugger;
    this.AttachmentForm = this.fb.group({
      attachTypeID: [this.attachments?.attachTypeID ?? null, [Validators.required]],
      employeeId: [
        this.createEmployeeForm ? this.employeeFormId : this.empId ?? null,
        [Validators.required],
      ],
      attachment: [null],
      fileFormat: [this.attachments?.fileFormat ?? ''],
      refrence1: [this.attachments?.refrence1 ?? ''],
      refrence2: [this.attachments?.refrence2 ?? ''],
      refrence3: [this.attachments?.refrence3 ?? ''],
      refrence4: [this.attachments?.refrence4 ?? ''],
      refrence5: [this.attachments?.refrence5 ?? ''],
      active: [this.attachments?.active ?? true],
    });
  }

  async loadAttechmentType(): Promise<void> {
    this.attechmentService
      .loadAttachmemtsTypes(this.orgId)
      .then((AttachmentInfo: any): any => {
        this.attechmentsTypes = AttachmentInfo?.data;
      })
      .catch((error: any): any => {
        console.error('Error loading Department:', error);
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
          this.getEmployeeAttachments();
        }
        else
          this.toastrService.error('No employee found');
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  getEmployeeAttachments() {
    this.attechmentService.loadAttachmemtsByEmployeeId(this.empId)
      .then((result: any): any => {
        console.log('in emlotesee', result);
        if (result?.data.length > 0) {
          this.employeeAttachments = result?.data;
        }
        else
          this.toastrService.error('No employee found');
      })
      .catch((error): any => {
        console.error('Error loading Employee:', error);
      });
  }

  onSubmit() {
    if (this.AttachmentForm.valid && this.fileUploadControl.value.length > 0) {
      if (this.editMode) {
        this.updateAttachmemt();
      } else {
        this.addAttachmemt();
      }
    } else {
      this.attchErrMsg = 'Please fill in all required fields correctly.';
    }
  }

  async addAttachmemt2() {
    debugger;
    const file: File = this.fileUploadControl.value[0];
    const formData = new FormData();

    formData.append("file", file);
    const newAttachment = this.AttachmentForm.value;
    newAttachment.attachment = formData;

    try {
      const result = await this.attechmentService.addAttachmemt(newAttachment);
      console.log('Attachmemt added successfully:', result);
      this.toastrService.success('Attachmemt added successfully');
      if (!this.createEmployeeForm)
        this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      console.error('Error adding attachmemt:', error);
      this.attchErrMsg = 'Error adding attachmemt. Please try again.';
    } finally {
      //this.isLoading = false;
    }
  }

  async addAttachmemt() {
    debugger;
    // Get the selected file from the file input control
    const file: File = this.fileUploadControl.value[0];

    // Create a new FormData object to hold the file and other form data
    const formData = new FormData();

    // Append the file to FormData (Attachment field)
    formData.append('Attachment', file, file.name);

    // Get other values from the form and append them to FormData
    const newAttachment = this.AttachmentForm.value;

    // Append additional fields to FormData
    formData.append('Active', newAttachment.Active ? 'true' : 'false');
    formData.append('Refrence1', newAttachment.refrence1 || '');
    formData.append('Refrence2', newAttachment.refrence2 || '');
    formData.append('EmployeeId', newAttachment.employeeId || ''); // Ensure this is a string
    formData.append('Refrence3', newAttachment.refrence3 || '');
    formData.append('Refrence4', newAttachment.refrence4 || '');
    formData.append('Refrence5', newAttachment.refrence5 || '');
    formData.append('FileFormat', newAttachment.fileFormat || '');
    formData.append('AttachTypeID', newAttachment.attachTypeID || '');

    try {
      // Call the service to upload the attachment with FormData
      const result: any = await this.attechmentService.addAttachmemt(formData);

      this.employeeAttachments.push(result.data);
      // Handle success
      console.log('Attachment added successfully:', result);
      this.toastrService.success('Attachment added successfully');

      this.initForm();
      this.fileUploadControl.clear();
    } catch (error) {
      // Handle error
      console.error('Error adding attachment:', error);
      this.attchErrMsg = 'Error adding attachment. Please try again.';
    } finally {
      // Optionally handle loading state, e.g., hiding loading spinner
      // this.isLoading = false;
    }
  }

  async updateAttachmemt() {
    const updatedAttachmemt = this.AttachmentForm.value;
    try {
      const result = await this.attechmentService.updateAttachmemt(
        this.attachments.attachmentId,
        updatedAttachmemt
      );
      console.log('Attachmemt updated successfully:', result);
      this.toastrService.success('Attachmemt updated successfully');
      this.router.navigate(['/hrms/employee-management/employees']);
    } catch (error) {
      console.error('Error updating attachmemt:', error);
      this.attchErrMsg = 'Error updating attachmemt. Please try again.';
    } finally {
      //this.isLoading = false;
    }
  }

  deleteAttachment(attachmentId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.attechmentService.deleteAttachmemt(attachmentId);
        const index = this.employeeAttachments.findIndex(item => item.attachmentId === attachmentId);
        if (index !== -1)
          this.employeeAttachments.splice(index, 1); // Removes 1 item at the found index

        this.toastrService.success('Attachmemt deleted successfully');
      }
    });
  }

  formEmployeeNextFn() {
    this.formEmployeeNext.emit();
  }

  formEmployeePreviousFn() {
    this.formEmployeePrevious.emit();
  }

  showModal = false;  // This will control the visibility of the popup
  imageUrl: string = '';  // This will hold the image URL when clicked

  openModal(imageUrl: string): void {
    this.imageUrl = imageUrl;  // Set the clicked image's URL
    this.showModal = true;  // Display the modal
  }

  closeModal(): void {
    this.showModal = false;  // Close the modal
  }
}
