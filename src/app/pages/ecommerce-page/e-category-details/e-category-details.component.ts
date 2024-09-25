import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AttachmentInfoDetails } from '../e-categories/model/attechment.model';
import { AttechmentService } from '../e-categories/service/attechment.service';

@Component({
    selector: 'app-e-category-details',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        CarouselModule,
        NgFor,
        NgClass,
        FormsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatProgressBarModule,
        CommonModule
    ],
    templateUrl: './e-category-details.component.html',
    styleUrl: './e-category-details.component.scss',
})
export class ECategoryDetailsComponent implements OnInit {
    attechmentDetails: AttachmentInfoDetails;
    orgId: number;
    id: number;
   

    // Input Counter
    value = 1;


    ngOnInit(): void {
        this.getOrgIdAndAttechmentId();
    }
   
    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _attechmentService: AttechmentService,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    getOrgIdAndAttechmentId() {
        this.route.queryParams.subscribe((params) => {
            this.orgId = params['orgId'];
            this.id = params['id'];
            this.getAttechmentById();
        });
    }
    getAttechmentById() {
        if (this.orgId && this.id) {
            this._attechmentService
                .loadAttachmemtsById(this.orgId, this.id)
                .then((organizationInfo: any): any => {
                    this.attechmentDetails = organizationInfo?.data[0];
                })
                .catch((error): any => {});
        }
    }
}
