import { Component, inject, Input, ViewChild } from '@angular/core';
import { HeaderScreenComponent } from "../../../../common/header-screen/header-screen.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/services/shared.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TitleInfo } from '../../models/title.model';
import { TitleService } from '../../services/title.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-titles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderScreenComponent
  ],
  templateUrl: './titles.component.html',
  styleUrl: './titles.component.scss'
})
export class TitlesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private sharedService = inject(SharedService);
  private titleService = inject(TitleService);

  dataSource = new MatTableDataSource<TitleInfo>();
  titles: TitleInfo[];

  pageNumber: number = 1;
  pageSize: number = 10;
  count: number;
  displayedColumns: string[] = [
    'titleName',
    'titleDescription',
    'refrence1',
    'refrence2',
    'status',
    'action',
  ];

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.titleService.get()
      .then((result: any): any => {
        this.titles = result.data;
        this.dataSource = new MatTableDataSource<TitleInfo>(
          this.titles
        );
        this.count = this.titles?.length;
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => console.log(error));
  }
}
