import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/services/shared.service';
import { OrgChartInfo } from '../../models/organization-chart.model';
import { OrganizationChartService } from '../../services/organization-chart.service';
import { TitleService } from '../../services/title.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeaderScreenComponent } from '../../../../common/header-screen/header-screen.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TitleInfo } from '../../models/title.model';

@Component({
  selector: 'app-title-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    HeaderScreenComponent
  ],
  templateUrl: './title-form.component.html',
  styleUrl: './title-form.component.scss'
})
export class TitleFormComponent {
  @ViewChild('submitForm') submitForm: any;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private sharedService = inject(SharedService);
  private titleService = inject(TitleService);
  private orgChartService = inject(OrganizationChartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  orgId: number;
  Form: FormGroup;
  titleForm: TitleInfo;
  orgCharts: OrgChartInfo[];
  titleId: number;
  editMode: boolean;
  submitted: boolean;

  ngOnInit(): void {
    this.orgId = this.sharedService.getOrgId();
    this.route.params.subscribe((params) => {
      this.titleId = params['id'];
      this.getById();
    });

    this.initForm();
    this.getOrgChart();
  }

  initForm() {
    this.Form = this.fb.group({
      orgId: [this.orgId, [Validators.required]],
      orgChartId: [this.titleForm?.orgChartId ?? null, [Validators.required]],
      titleId: [this.titleForm?.titleId ?? ''],
      titleName: [this.titleForm?.titleName ?? '', [Validators.required]],
      titleDescription: [this.titleForm?.titleDescription ?? '', [Validators.required]],
      refrence1: [this.titleForm?.refrence1 ?? ''],
      refrence2: [this.titleForm?.refrence2 ?? ''],
      refrence3: [this.titleForm?.refrence3 ?? ''],
      refrence4: [this.titleForm?.refrence4 ?? ''],
      refrence5: [this.titleForm?.refrence5 ?? ''],
      active: [this.titleForm?.active ?? true],
    });
  }

  getById() {
    if (this.titleId == undefined)
      return;

    this.titleService.getById(this.titleId)
      .then((result: any): any => {
        console.log(result);
        this.titleForm = result.data[0];
        this.initForm();
        this.editMode = true;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  getOrgChart() {
    this.orgChartService.get(this.orgId)
      .then((result: any): any => {
        console.log(result);
        this.orgCharts = result.data;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  onSubmit() {
    if (!this.editMode)
      this.create();
    else
      this.update();
  }

  create() {
    const newTitle = this.Form.value;
    console.log(newTitle);
    this.titleService.create(newTitle)
      .then((result: any): any => {
        console.log(result);
        this.reset();
        this.toastrService.success('Title added successfully');
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  update() {
    const updatedTitle = this.Form.value;
    console.log(updatedTitle);
    this.titleService.update(updatedTitle.titleId, updatedTitle)
      .then((result: any): any => {
        console.log(result);
        this.toastrService.success('Title updated successfully');
        this.router.navigate(['/hrms/configuration/title-form']);
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  reset() {
    this.submitForm.resetForm();
    this.Form.controls['active'].setValue(true);
    this.editMode = false;
  }
}
