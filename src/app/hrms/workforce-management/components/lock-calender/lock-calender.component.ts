import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CalenderInfo, CalenderPayload } from '../../models/attendance-calender.model';
import { AttendanceCalenderService } from '../../services/attendance-calender.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lock-calender',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './lock-calender.component.html',
  styleUrl: './lock-calender.component.scss'
})
export class LockCalenderComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private attendanceCalenderService = inject(AttendanceCalenderService);
  private toastrService = inject(ToastrService);

  attendaceCalenders!: CalenderInfo[];
  dataSource = new MatTableDataSource<CalenderInfo>(this.attendaceCalenders);

  isLock: boolean;
  tableCount: number;
  pageSize: number = 12;

  displayedColumns: string[] = [
    'year',
    'monthName',
    //'month',
    'lock',
  ];

  ngOnInit(): void {
    this.getCalender();
  }

  getCalender() {
    this.attendanceCalenderService.loadCalender()
      .then((result: any): any => {
        this.attendaceCalenders = result?.data;
        this.tableCount = result?.data.length;
        this.dataSource = new MatTableDataSource<CalenderInfo>(
          this.attendaceCalenders.sort((a, b) => (a.month > b.month) ? 1 : ((b.month > a.month) ? -1 : 0))
        );
        this.dataSource.paginator = this.paginator;
      })
      .catch((error): any => {
        console.log(error);
      });
  }

  updateCalender(calenderObj: any) {
    //calenderObj.lock = this.isLock;
    console.log(calenderObj);
    let obj: CalenderPayload = {
      //day: 0,
      month: calenderObj.month,
      year: calenderObj.year,
      lock: calenderObj.lock
    }

    this.attendanceCalenderService.updateCalender(obj)
      .then((result: any): any => {
        this.toastrService.success('Calender updated successfully');
        this.getCalender();
      })
      .catch((error): any => {
        console.log(error);
      });
  }
}
