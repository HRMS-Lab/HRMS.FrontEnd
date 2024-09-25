import { NgFor, NgClass, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { BranchesInfoDetails } from '../branches/models/branches.model';
import { StarRatingComponent } from '../e-product-details/star-rating/star-rating.component';
import { ProductsService } from '../e-products-list/service/products.service';
import { BranchesService } from '../branches/service/branches.service';

@Component({
  selector: 'app-branch-details',
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
    StarRatingComponent,
    MatProgressBarModule,
    CommonModule
],  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent {
  BrancheDetails: BranchesInfoDetails;
  orgId: number;
  id: number;
  // Star Rating
  selectedRating: number = 2;

  // Input Counter
  value = 1;


  ngOnInit(): void {
      this.getOrgIdAndBrancheId();
  }
 
  // isToggled
  isToggled = false;

  constructor(
      public themeService: CustomizerSettingsService,
      private _productService: BranchesService,
      private route: ActivatedRoute
  ) {
      this.themeService.isToggled$.subscribe((isToggled) => {
          this.isToggled = isToggled;
      });
  }

  getOrgIdAndBrancheId() {
      this.route.queryParams.subscribe((params) => {
          this.orgId = params['orgId'];
          this.id = params['id'];
          this.getBrancheById();
      });
  }
  getBrancheById() {
      if (this.orgId && this.id) {
          this._productService
              .loadBranchessById(this.orgId, this.id)
              .then((organizationInfo: any): any => {
                  this.BrancheDetails = organizationInfo?.data[0];
              })
              .catch((error): any => {});
      }
  }
}

