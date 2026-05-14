import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { EmployeeInternalService } from "../hrms/employee-management/services/employee.service";
import { jwtDecode } from "jwt-decode";
import { EmployeeCounts } from "../hrms/employee-management/models/employee.model";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faUserXmark, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  colors: any;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    NgApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  private employeeService = inject(EmployeeInternalService);
  public chartOptions: Partial<ChartOptions>;

  employeeCounts: EmployeeCounts = {
    totalEmployees: 0,
    activeEmployeeCount: 0,
    inActiveEmployeeCount: 0,
    employeeIDLastId: ''
  };
  tokenObj: any;
  orgId: number;
  faUsers = faUsers;
  faUserXmark = faUserXmark;
  faUserCheck = faUserCheck;

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.tokenObj = jwtDecode(token);
      this.orgId = this.tokenObj.OrganizationID;
    }

    this.chartOptions = {
      series: [
        {
          name: "Employees",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -25,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [
          "Karam el sham (Maadi)",
          "savils",
          "Hyde Park",
          "IGT",
          "OVO",
          "Point 90",
          "Gourmet",
          "Karam el sham (Faisal)",
          "Open Air ( Madenty)",
          "Samaya",
          ["Karam el sham","(West-ElBalad)"],
          "Mti Katamya"
        ],
        position: "bottom",
        labels: {
          show: true,
          style: {
            colors: "#919aa3",
            fontSize: "14px",
            cssClass: "text-wrap"
          }
        },
        axisBorder: {
          show: false,
          color: '#e0e0e0'
        },
        axisTicks: {
          show: true,
          color: '#e0e0e0'
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      colors: [
        "#0f79f3"
      ],
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
          style: {
            colors: "#919aa3",
            fontSize: "14px"
          }
        }
      },
      title: {
        text: "Project Specialist Staff",
        align: "left",
        offsetX: -9,
        style: {
          fontWeight: '500',
          fontSize: '15px',
          color: '#475569'
        }
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: "#e0e0e0"
      }
    };

    this.loadEmployeeCounts();
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
}