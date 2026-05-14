import { Component, inject, OnInit } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { NgClass, NgFor } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgScrollbarModule,
        MatExpansionModule,
        RouterLinkActive,
        RouterModule,
        RouterLink,
        NgClass,
        NgFor
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    currentUrl: string;

    menu: any[];
    tokenObj: any;
    userScreens: any[];

    constructor(
        private router: Router,
        private toggleService: ToggleService,
        private sharedService: SharedService,
        public themeService: CustomizerSettingsService) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                // Check if the current URL includes the menu name
                this.currentUrl = event.url;
            }
        });

        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        // Subscribe to the event
        this.sharedService.menuEvent$.subscribe(() => {
            this.getFilteredChildIds();
        });

        this.getFilteredChildIds();
    }

    fillMenu() {
        this.menu = [
            // Administraion
            {
                id: 4,
                name: 'Administraion',
                icon: 'admin_panel_settings',
                componentName: 'admin',
                child: [{
                    id: 14,
                    name: 'Users',
                    routerUrl: '/hrms/admin/user'
                },
                {
                    id: 15,
                    name: 'User Interface',
                    routerUrl: '/hrms/admin/user-interface'
                },
                {
                    id: 16,
                    name: 'User UI Role',
                    routerUrl: '/hrms/admin/user-interface-role'
                },
                {
                    id: 17,
                    name: 'Role',
                    routerUrl: '/hrms/admin/role'
                },
                {
                    id: 18,
                    name: 'Security Group',
                    routerUrl: '/hrms/admin/security-group'
                },
                {
                    id: 19,
                    name: 'Security Role',
                    routerUrl: '/hrms/admin/security-role'
                }]
            },
            // Employee Management
            {
                id: 1,
                name: 'Employee Management',
                icon: 'group',
                componentName: 'employee-management',
                child: [{
                    id: 2,
                    name: 'Employees',
                    routerUrl: '/hrms/employee-management/employees'
                },
                {
                    id: 2,
                    name: 'Employees Registry',
                    routerUrl: '/hrms/employee-management/employees-registry'
                },
                {
                    id: 1,
                    name: 'Create Employee',
                    routerUrl: '/hrms/employee-management/employee-form'
                }]
            },
            // Workforce Management
            {
                id: 2,
                name: 'Workforce Management',
                icon: 'business_center',
                componentName: 'workforce-management',
                child: [{
                    id: 10,
                    name: 'Admin Projects',
                    routerUrl: '/hrms/workforce-management/admin-project'
                },
                {
                    id: 11,
                    name: 'Attendance',
                    routerUrl: '/hrms/workforce-management/attendance'
                },
                {
                    id: 12,
                    name: 'Disclaimer',
                    routerUrl: '/hrms/workforce-management/disclaimer'
                },
                {
                    id: 13,
                    name: 'Lock Calender',
                    routerUrl: '/hrms/workforce-management/lock-calender'
                }]
            },
            // Payroll
            {
                id: 5,
                name: 'Payroll',
                icon: 'payments',
                componentName: 'payroll',
                child: [
                    {
                        id: 20,
                        name: 'Earning',
                        routerUrl: '/hrms/payroll/earning'
                    },
                    {
                        id: 21,
                        name: 'Deduction',
                        routerUrl: '/hrms/payroll/deduction'
                    },
                    {
                        id: 23,
                        name: 'Templates',
                        routerUrl: '/hrms/payroll/templates'
                    },
                    {
                        id: 22,
                        name: 'Template Form',
                        routerUrl: '/hrms/payroll/template-form'
                    },
                    {
                        id: 24,
                        name: 'Contracts',
                        routerUrl: '/hrms/payroll/contracts'
                    },
                    {
                        id: 25,
                        name: 'Contract Form',
                        routerUrl: '/hrms/payroll/contract-form'
                    },
                    {
                        id: 26,
                        name: 'Calculation',
                        routerUrl: '/hrms/payroll/calculation'
                    },
                ]
            },
            // Configuration
            {
                id: 3,
                name: 'Configuration',
                icon: 'app_registration',
                // componentName: 'ecommerce-page',
                componentName: 'Configuration',
                child: [{
                    id: 4,
                    name: 'Titles',
                    routerUrl: '/hrms/configuration/titles'
                },
                {
                    id: 4,
                    name: 'Create Title',
                    routerUrl: '/hrms/configuration/title-form'
                },
                {
                    id: 3,
                    name: 'Departments List',
                    routerUrl: '/ecommerce-page/products-list'
                },
                {
                    id: 5,
                    name: 'Organizations',
                    routerUrl: '/ecommerce-page/sellers'
                },
                {
                    id: 6,
                    name: 'Create Organizations',
                    routerUrl: '/ecommerce-page/create-seller'
                }]
            },
            {
                id: 4,
                name: 'Lookup',
                icon: 'app_registration',
                componentName: 'lookup',
                child: [{
                    id: 7,
                    name: 'Regions',
                    routerUrl: '/lookup/region'
                },
                {
                    id: 9,
                    name: 'Branches',
                    routerUrl: '/lookup/branches'
                }]
            },
            // {
            //     id: 4,
            //     name: 'Configuration',
            //     icon: 'app_registration',
            //     componentName: 'Configuration',
            //     child: [{
            //         id: 7,
            //         name: 'Titles',
            //         routerUrl: '/hrms/configuration/titles'
            //     }]
            // },
        ];
    }

    getFilteredChildIds() {
        // Get user screens from token
        let token = localStorage.getItem("token");
        if (token != null) {
            this.tokenObj = jwtDecode(token);
            this.userScreens = JSON.parse(this.tokenObj.AllowedPages);
        }

        this.fillMenu();
        this.menu = this.menu
            .map(item => ({
                ...item,
                child: item.child.filter((child: any) => this.userScreens?.includes(child.id)),
            }))
            .filter(item => item.child.length > 0);
    }

    expandedMenu(menuName: string): boolean {
        return this.currentUrl?.includes(menuName.toLowerCase())
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

}