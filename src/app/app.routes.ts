import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { AlertsComponent } from './ui-elements/alerts/alerts.component';
import { AutocompleteComponent } from './ui-elements/autocomplete/autocomplete.component';
import { AvatarsComponent } from './ui-elements/avatars/avatars.component';
import { AccordionComponent } from './ui-elements/accordion/accordion.component';
import { BadgesComponent } from './ui-elements/badges/badges.component';
import { BreadcrumbComponent } from './ui-elements/breadcrumb/breadcrumb.component';
import { ButtonToggleComponent } from './ui-elements/button-toggle/button-toggle.component';
import { BottomSheetComponent } from './ui-elements/bottom-sheet/bottom-sheet.component';
import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
import { CardsComponent } from './ui-elements/cards/cards.component';
import { CarouselsComponent } from './ui-elements/carousels/carousels.component';
import { CheckboxComponent } from './ui-elements/checkbox/checkbox.component';
import { ChipsComponent } from './ui-elements/chips/chips.component';
import { ClipboardComponent } from './ui-elements/clipboard/clipboard.component';
import { DatepickerComponent } from './ui-elements/datepicker/datepicker.component';
import { DialogComponent } from './ui-elements/dialog/dialog.component';
import { DividerComponent } from './ui-elements/divider/divider.component';
import { DragDropComponent } from './ui-elements/drag-drop/drag-drop.component';
import { ExpansionComponent } from './ui-elements/expansion/expansion.component';
import { FormFieldComponent } from './ui-elements/form-field/form-field.component';
import { GridListComponent } from './ui-elements/grid-list/grid-list.component';
import { InputComponent } from './ui-elements/input/input.component';
import { IconComponent } from './ui-elements/icon/icon.component';
import { ListComponent } from './ui-elements/list/list.component';
import { ListboxComponent } from './ui-elements/listbox/listbox.component';
import { MenusComponent } from './ui-elements/menus/menus.component';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { ProgressBarComponent } from './ui-elements/progress-bar/progress-bar.component';
import { RadioComponent } from './ui-elements/radio/radio.component';
import { RatioComponent } from './ui-elements/ratio/ratio.component';
import { SelectComponent } from './ui-elements/select/select.component';
import { SidenavComponent } from './ui-elements/sidenav/sidenav.component';
import { SlideToggleComponent } from './ui-elements/slide-toggle/slide-toggle.component';
import { SliderComponent } from './ui-elements/slider/slider.component';
import { SnackbarComponent } from './ui-elements/snackbar/snackbar.component';
import { StepperComponent } from './ui-elements/stepper/stepper.component';
import { TypographyComponent } from './ui-elements/typography/typography.component';
import { ToolbarComponent } from './ui-elements/toolbar/toolbar.component';
import { TableComponent } from './ui-elements/table/table.component';
import { TabsComponent } from './ui-elements/tabs/tabs.component';
import { TreeComponent } from './ui-elements/tree/tree.component';
import { VideosComponent } from './ui-elements/videos/videos.component';
import { UtilitiesComponent } from './ui-elements/utilities/utilities.component';
import { ColorPickerComponent } from './ui-elements/color-picker/color-picker.component';
import { TooltipComponent } from './ui-elements/tooltip/tooltip.component';
import { ToDoListComponent } from './apps/to-do-list/to-do-list.component';
import { CalendarComponent } from './apps/calendar/calendar.component';
import { ContactsComponent } from './apps/contacts/contacts.component';
import { ChatComponent } from './apps/chat/chat.component';
import { KanbanBoardComponent } from './apps/kanban-board/kanban-board.component';
import { FileManagerComponent } from './apps/file-manager/file-manager.component';
import { MyDriveComponent } from './apps/file-manager/my-drive/my-drive.component';
import { AssetsComponent } from './apps/file-manager/assets/assets.component';
import { ProjectsComponent } from './apps/file-manager/projects/projects.component';
import { PersonalComponent } from './apps/file-manager/personal/personal.component';
import { ApplicationsComponent } from './apps/file-manager/applications/applications.component';
import { DocumentsComponent } from './apps/file-manager/documents/documents.component';
import { MediaComponent } from './apps/file-manager/media/media.component';
import { EmailComponent } from './apps/email/email.component';
import { InboxComponent } from './apps/email/inbox/inbox.component';
import { ComposeComponent } from './apps/email/compose/compose.component';
import { ReadComponent } from './apps/email/read/read.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
import { WizardComponent } from './forms/wizard/wizard.component';
import { EditorsComponent } from './forms/editors/editors.component';
import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
import { DataTableComponent } from './tables/data-table/data-table.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { TablesComponent } from './tables/tables.component';
import { MoreChartsComponent } from './apexcharts/more-charts/more-charts.component';
import { PolarChartsComponent } from './apexcharts/polar-charts/polar-charts.component';
import { PieChartsComponent } from './apexcharts/pie-charts/pie-charts.component';
import { RadarChartsComponent } from './apexcharts/radar-charts/radar-charts.component';
import { RadialBarChartsComponent } from './apexcharts/radial-bar-charts/radial-bar-charts.component';
import { MixedChartsComponent } from './apexcharts/mixed-charts/mixed-charts.component';
import { ColumnChartsComponent } from './apexcharts/column-charts/column-charts.component';
import { AreaChartsComponent } from './apexcharts/area-charts/area-charts.component';
import { LineChartsComponent } from './apexcharts/line-charts/line-charts.component';
import { ApexchartsComponent } from './apexcharts/apexcharts.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TestimonialsPageComponent } from './pages/testimonials-page/testimonials-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RemixiconComponent } from './icons/remixicon/remixicon.component';
import { MaterialSymbolsComponent } from './icons/material-symbols/material-symbols.component';
import { IconsComponent } from './icons/icons.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { TeamsComponent } from './pages/profile-page/teams/teams.component';
import { UserProfileComponent } from './pages/profile-page/user-profile/user-profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { StarterComponent } from './starter/starter.component';
import { ProfileSettingsComponent } from './pages/social-page/profile-settings/profile-settings.component';
import { ActivityComponent } from './pages/social-page/profile/activity/activity.component';
import { AboutComponent } from './pages/social-page/profile/about/about.component';
import { TimelineComponent } from './pages/social-page/profile/timeline/timeline.component';
import { ProfileComponent } from './pages/social-page/profile/profile.component';
import { SocialPageComponent } from './pages/social-page/social-page.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { EditAnEventComponent } from './pages/events-page/edit-an-event/edit-an-event.component';
import { CreateAnEventComponent } from './pages/events-page/create-an-event/create-an-event.component';
import { EventDetailsComponent } from './pages/events-page/event-details/event-details.component';
import { EventsListComponent } from './pages/events-page/events-list/events-list.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { HdReportsComponent } from './pages/help-desk-page/hd-reports/hd-reports.component';
import { HdAgentsComponent } from './pages/help-desk-page/hd-agents/hd-agents.component';
import { HdTicketDetailsComponent } from './pages/help-desk-page/hd-ticket-details/hd-ticket-details.component';
import { HdTicketsComponent } from './pages/help-desk-page/hd-tickets/hd-tickets.component';
import { HelpDeskPageComponent } from './pages/help-desk-page/help-desk-page.component';
import { LInstructorsComponent } from './pages/lms-page/l-instructors/l-instructors.component';
import { LEditCourseComponent } from './pages/lms-page/l-edit-course/l-edit-course.component';
import { LCreateCourseComponent } from './pages/lms-page/l-create-course/l-create-course.component';
import { LCourseDetailsComponent } from './pages/lms-page/l-course-details/l-course-details.component';
import { LCoursesComponent } from './pages/lms-page/l-courses/l-courses.component';
import { LmsPageComponent } from './pages/lms-page/lms-page.component';
import { PmEditUserComponent } from './pages/project-management-page/pm-edit-user/pm-edit-user.component';
import { PmCreateUserComponent } from './pages/project-management-page/pm-create-user/pm-create-user.component';
import { PmUsersComponent } from './pages/project-management-page/pm-users/pm-users.component';
import { PmKanbanBoardComponent } from './pages/project-management-page/pm-kanban-board/pm-kanban-board.component';
import { PmTeamsComponent } from './pages/project-management-page/pm-teams/pm-teams.component';
import { PmClientsComponent } from './pages/project-management-page/pm-clients/pm-clients.component';
import { PmCreateProjectComponent } from './pages/project-management-page/pm-create-project/pm-create-project.component';
import { PmProjectsListComponent } from './pages/project-management-page/pm-projects-list/pm-projects-list.component';
import { PmProjectOverviewComponent } from './pages/project-management-page/pm-project-overview/pm-project-overview.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { CCreateDealComponent } from './pages/crm-page/c-create-deal/c-create-deal.component';
import { CDealsComponent } from './pages/crm-page/c-deals/c-deals.component';
import { CLeadsComponent } from './pages/crm-page/c-leads/c-leads.component';
import { CEditLeadComponent } from './pages/crm-page/c-edit-lead/c-edit-lead.component';
import { CCreateLeadComponent } from './pages/crm-page/c-create-lead/c-create-lead.component';
import { CCustomersComponent } from './pages/crm-page/c-customers/c-customers.component';
import { CEditContactComponent } from './pages/crm-page/c-edit-contact/c-edit-contact.component';
import { CCreateContactComponent } from './pages/crm-page/c-create-contact/c-create-contact.component';
import { CContactsComponent } from './pages/crm-page/c-contacts/c-contacts.component';
import { CrmPageComponent } from './pages/crm-page/crm-page.component';
import { EReviewsComponent } from './pages/ecommerce-page/e-reviews/e-reviews.component';
import { EEditCategoryComponent } from './pages/ecommerce-page/e-edit-category/e-edit-category.component';
import { ECreateCategoryComponent } from './pages/ecommerce-page/e-create-category/e-create-category.component';
import { ECategoriesComponent } from './pages/ecommerce-page/e-categories/e-categories.component';
import { ERefundsComponent } from './pages/ecommerce-page/e-refunds/e-refunds.component';
import { ECreateSellerComponent } from './pages/ecommerce-page/e-create-seller/e-create-seller.component';
import { ESellerDetailsComponent } from './pages/ecommerce-page/e-seller-details/e-seller-details.component';
import { ESellersComponent } from './pages/ecommerce-page/e-sellers/e-sellers.component';
import { ECheckoutComponent } from './pages/ecommerce-page/e-checkout/e-checkout.component';
import { ECartComponent } from './pages/ecommerce-page/e-cart/e-cart.component';
import { ECustomerDetailsComponent } from './pages/ecommerce-page/e-customer-details/e-customer-details.component';
import { ECustomersComponent } from './pages/ecommerce-page/e-customers/e-customers.component';
import { EOrderTrackingComponent } from './pages/ecommerce-page/e-order-tracking/e-order-tracking.component';
import { ECreateOrderComponent } from './pages/ecommerce-page/e-create-order/e-create-order.component';
import { EOrderDetailsComponent } from './pages/ecommerce-page/e-order-details/e-order-details.component';
import { EOrdersComponent } from './pages/ecommerce-page/e-orders/e-orders.component';
import { EEditProductComponent } from './pages/ecommerce-page/e-edit-product/e-edit-product.component';
import { ECreateProductComponent } from './pages/ecommerce-page/e-create-product/e-create-product.component';
import { EProductDetailsComponent } from './pages/ecommerce-page/e-product-details/e-product-details.component';
import { EProductsListComponent } from './pages/ecommerce-page/e-products-list/e-products-list.component';
import { EProductsGridComponent } from './pages/ecommerce-page/e-products-grid/e-products-grid.component';
import { EcommercePageComponent } from './pages/ecommerce-page/ecommerce-page.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';
import { ECategoryDetailsComponent } from './pages/ecommerce-page/e-category-details/e-category-details.component';
import { ECreateCustomerComponent } from './pages/ecommerce-page/e-create-customer/e-create-customer.component';
import { RegoinDetailsComponent } from './pages/ecommerce-page/regoin-details/regoin-details.component';
import { CreateRegoinComponent } from './pages/ecommerce-page/create-regoin/create-regoin.component';
import { AdressesComponent } from './pages/ecommerce-page/adresses/adresses.component';
import { CreateAdressComponent } from './pages/ecommerce-page/create-adress/create-adress.component';
import { CreateDistrictComponent } from './pages/ecommerce-page/create-district/create-district.component';
import { DistrictsComponent } from './pages/ecommerce-page/districts/districts.component';
import { BranchDetailsComponent } from './pages/ecommerce-page/branch-details/branch-details.component';
import { CreateBranchComponent } from './pages/ecommerce-page/create-branch/create-branch.component';
// import { BranchesComponent } from './pages/ecommerce-page/branches/branches.component';
import { LoginComponent } from './authentication/login/login.component';
import { LookupComponent } from './lookup/lookup.component';
import { RegionComponent } from './lookup/region/region.component';
import { RegionFormComponent } from './lookup/region/region-form/region-form.component';
import { RegionListComponent } from './lookup/region/region-list/region-list.component';
import { DistrictListComponent } from './lookup/district/district-list/district-list.component';
import { DistrictFormComponent } from './lookup/district/district-form/district-form.component';
import { DistrictComponent } from './lookup/district/district.component';
import { BranchesComponent } from './lookup/branches/branches.component';
import { BranchesListComponent } from './lookup/branches/branches-list/branches-list.component';
import { BranchFormComponent } from './lookup/branches/branch-form/branch-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddressComponent } from './hrms/employee-management/components/address/address.component';
import { AttachmentComponent } from './hrms/employee-management/components/attachment/attachment.component';
import { DetailsComponent } from './hrms/employee-management/components/details/details.component';
import { EmployeeFormComponent } from './hrms/employee-management/components/employee-form/employee-form.component';
import { EmployeeListComponent } from './hrms/employee-management/components/employee-list/employee-list.component';
import { EmployeeManagementComponent } from './hrms/employee-management/employee-management.component';
import { ProjectComponent } from './hrms/employee-management/components/project/project.component';
import { HrmsComponent } from './hrms/hrms.component';
import { AuthGuard } from './core/auth/auth.guard';
import { WorkforceManagementComponent } from './hrms/workforce-management/workforce-management.component';
import { AdminProjectsComponent } from './hrms/workforce-management/components/admin-projects/admin-projects.component';
import { AttendanceComponent } from './hrms/workforce-management/components/attendance/attendance.component';
import { DisclaimerComponent } from './hrms/workforce-management/components/disclaimer/disclaimer.component';
import { LockCalenderComponent } from './hrms/workforce-management/components/lock-calender/lock-calender.component';
import { SecurityGroupComponent } from './hrms/admin/components/security-group/security-group.component';
import { AdminComponent } from './hrms/admin/admin.component';
import { SecurityRoleComponent } from './hrms/admin/components/security-role/security-role.component';
import { RoleComponent } from './hrms/admin/components/role/role.component';
import { UserComponent } from './hrms/admin/components/user/user.component';
import { UserInterfaceComponent } from './hrms/admin/components/user-interface/user-interface.component';
import { UserInterfaceRoleComponent } from './hrms/admin/components/user-interface-role/user-interface-role.component';
import { PayrollComponent } from './hrms/payroll/payroll.component';
import { EarningComponent } from './hrms/payroll/components/earning/earning.component';
import { DeductionComponent } from './hrms/payroll/components/deduction/deduction.component';
import { TemplatesComponent } from './hrms/payroll/components/templates/templates.component';
import { TemplateFormComponent } from './hrms/payroll/components/template-form/template-form.component';
import { ContractFormComponent } from './hrms/payroll/components/contract-form/contract-form.component';
import { ContractsComponent } from './hrms/payroll/components/contracts/contracts.component';
import { CalculationComponent } from './hrms/payroll/components/calculation/calculation.component';
import { ConfigurationComponent } from './hrms/configuration/configuration.component';
import { TitlesComponent } from './hrms/configuration/components/titles/titles.component';
import { TitleFormComponent } from './hrms/configuration/components/title-form/title-form.component';
import { EmployeesRegistryComponent } from './hrms/employee-management/components/employees-registry/employees-registry.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    {
        path: 'hrms',
        component: HrmsComponent,
        children: [
            {
                path: 'employee-management',
                component: EmployeeManagementComponent,
                children: [
                    { path: '', component: EmployeeListComponent },
                    { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard], data: { screenId: 2 } },
                    { path: 'employee-form', component: EmployeeFormComponent, canActivate: [AuthGuard], data: { screenId: 1 } },
                    { path: 'employee-form/:id', component: EmployeeFormComponent, canActivate: [AuthGuard], data: { screenId: 1 } },
                    { path: 'employees-registry', component: EmployeesRegistryComponent, canActivate: [AuthGuard], data: { screenId: 2 } },
                    { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard], data: { screenId: 2 } },
                    { path: 'address/:id', component: AddressComponent, canActivate: [AuthGuard], data: { screenId: 2 } },
                    { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard], data: { screenId: 2 } },
                    { path: 'attachment/:id', component: AttachmentComponent, canActivate: [AuthGuard], data: { screenId: 2 } },
                ],
            },
            {
                path: 'admin',
                component: AdminComponent,
                children: [
                    { path: '', component: SecurityGroupComponent },
                    { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { screenId: 14 } },
                    { path: 'user-interface', component: UserInterfaceComponent, canActivate: [AuthGuard], data: { screenId: 15 } },
                    { path: 'user-interface-role', component: UserInterfaceRoleComponent, canActivate: [AuthGuard], data: { screenId: 16 } },
                    { path: 'role', component: RoleComponent, canActivate: [AuthGuard], data: { screenId: 17 } },
                    { path: 'security-group', component: SecurityGroupComponent, canActivate: [AuthGuard], data: { screenId: 18 } },
                    { path: 'security-role', component: SecurityRoleComponent, canActivate: [AuthGuard], data: { screenId: 19 } },
                ],
            },
            {
                path: 'workforce-management',
                component: WorkforceManagementComponent,
                children: [
                    { path: '', component: AdminProjectsComponent },
                    { path: 'admin-project', component: AdminProjectsComponent, canActivate: [AuthGuard], data: { screenId: 10 } },
                    { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard], data: { screenId: 11 } },
                    { path: 'disclaimer', component: DisclaimerComponent, canActivate: [AuthGuard], data: { screenId: 12 } },
                    { path: 'lock-calender', component: LockCalenderComponent, canActivate: [AuthGuard], data: { screenId: 13 } },
                ],
            },
            {
                path: 'payroll',
                component: PayrollComponent,
                children: [
                    { path: '', component: TemplatesComponent },
                    { path: 'earning', component: EarningComponent, canActivate: [AuthGuard], data: { screenId: 20 } },
                    { path: 'deduction', component: DeductionComponent, canActivate: [AuthGuard], data: { screenId: 21 } },
                    { path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard], data: { screenId: 23 } },
                    { path: 'template-form', component: TemplateFormComponent, canActivate: [AuthGuard], data: { screenId: 22 } },
                    { path: 'contracts', component: ContractsComponent, canActivate: [AuthGuard], data: { screenId: 24 } },
                    { path: 'contract-form', component: ContractFormComponent, canActivate: [AuthGuard], data: { screenId: 25 } },
                    { path: 'calculation', component: CalculationComponent, canActivate: [AuthGuard], data: { screenId: 26 } },
                ],
            },
            {
                path: 'configuration',
                component: ConfigurationComponent,
                children: [
                    { path: '', component: TitlesComponent },
                    { path: 'titles', component: TitlesComponent, canActivate: [AuthGuard], data: { screenId: 4 } },
                    { path: 'title-form', component: TitleFormComponent, canActivate: [AuthGuard], data: { screenId: 4 } },
                    { path: 'title-form/:id', component: TitleFormComponent, canActivate: [AuthGuard], data: { screenId: 4 } },
                ],
            },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'lookup',
        component: LookupComponent,
        children: [
            { path: '', component: RegionComponent },
            {
                path: 'region', component: RegionComponent,
                children: [
                    { path: '', component: RegionListComponent },
                    { path: 'region-list', component: RegionListComponent, canActivate: [AuthGuard], data: { screenId: 7 } },
                    { path: 'region-form', component: RegionFormComponent, canActivate: [AuthGuard], data: { screenId: 7 } },
                    { path: 'region-form/:id', component: RegionFormComponent, canActivate: [AuthGuard], data: { screenId: 7 } },
                ],
            },
            {
                path: 'district', component: DistrictComponent,
                children: [
                    { path: '', component: DistrictListComponent },
                    { path: 'district-list/:regId', component: DistrictListComponent, canActivate: [AuthGuard], data: { screenId: 8 } },
                    { path: 'district-form/:regId', component: DistrictFormComponent, canActivate: [AuthGuard], data: { screenId: 8 } },
                    { path: 'district-form/:regId/:id', component: DistrictFormComponent, canActivate: [AuthGuard], data: { screenId: 8 } },
                ],
            },
            {
                path: 'branches', component: BranchesComponent,
                children: [
                    { path: '', component: BranchesListComponent },
                    { path: 'branches-list', component: BranchesListComponent, canActivate: [AuthGuard], data: { screenId: 9 } },
                    { path: 'branch-form', component: BranchFormComponent, canActivate: [AuthGuard], data: { screenId: 9 } },
                    { path: 'branch-form/:regId/:id', component: BranchFormComponent, canActivate: [AuthGuard], data: { screenId: 9 } },
                ],
            },
        ],
        canActivate: [AuthGuard]
    },




    { path: 'ecommerce', component: EcommerceComponent },
    { path: 'crm', component: CrmComponent },
    { path: 'project-management', component: ProjectManagementComponent },
    { path: 'lms', component: LmsComponent },
    { path: 'help-desk', component: HelpDeskComponent },
    { path: 'to-do-list', component: ToDoListComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'kanban-board', component: KanbanBoardComponent },
    {
        path: 'file-manager',
        component: FileManagerComponent,
        children: [
            { path: '', component: MyDriveComponent },
            { path: 'assets', component: AssetsComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'applications', component: ApplicationsComponent },
            { path: 'documents', component: DocumentsComponent },
            { path: 'media', component: MediaComponent },
        ],
    },
    {
        path: 'email',
        component: EmailComponent,
        children: [
            { path: '', component: InboxComponent },
            { path: 'compose', component: ComposeComponent },
            { path: 'read', component: ReadComponent },
        ],
    },
    {
        path: 'ecommerce-page',
        component: EcommercePageComponent,
        children: [
            { path: '', component: EProductsGridComponent },
            { path: 'products-list', component: EProductsListComponent },
            { path: 'product-details', component: EProductDetailsComponent },
            { path: 'create-product', component: ECreateProductComponent },
            { path: 'edit-product', component: EEditProductComponent },
            { path: 'orders', component: EOrdersComponent },
            { path: 'order-details', component: EOrderDetailsComponent },
            { path: 'create-order', component: ECreateOrderComponent },
            { path: 'regoin-details', component: RegoinDetailsComponent },
            { path: 'create-regoin', component: CreateRegoinComponent },
            { path: 'adresses', component: AdressesComponent },
            { path: 'create-address', component: CreateAdressComponent },
            { path: 'districts', component: DistrictsComponent },
            { path: 'create-district', component: CreateDistrictComponent },
            { path: 'create-address', component: CreateAdressComponent },
            { path: 'branches', component: BranchesComponent },
            { path: 'create-branch', component: CreateBranchComponent },
            { path: 'branch-details', component: BranchDetailsComponent },
            { path: 'order-tracking', component: EOrderTrackingComponent },
            { path: 'customers', component: ECustomersComponent },
            { path: 'customer-details', component: ECustomerDetailsComponent },
            { path: 'cart', component: ECartComponent },
            { path: 'checkout', component: ECheckoutComponent },
            { path: 'sellers', component: ESellersComponent },
            { path: 'seller-details', component: ESellerDetailsComponent },
            { path: 'create-seller', component: ECreateSellerComponent },
            { path: 'refunds', component: ERefundsComponent },
            { path: 'categories', component: ECategoriesComponent },
            { path: 'category-details', component: ECategoryDetailsComponent },
            { path: 'create-category', component: ECreateCategoryComponent },
            { path: 'edit-category', component: EEditCategoryComponent },
            { path: 'reviews', component: EReviewsComponent },
        ],
    },
    {
        path: 'crm-page',
        component: CrmPageComponent,
        children: [
            { path: '', component: CContactsComponent },
            { path: 'create-contact', component: CCreateContactComponent },
            { path: 'edit-contact', component: CEditContactComponent },
            { path: 'customers', component: CCustomersComponent },
            { path: 'create-customer', component: ECreateCustomerComponent },
            { path: 'create-lead', component: CCreateLeadComponent },
            { path: 'edit-lead', component: CEditLeadComponent },
            { path: 'leads', component: CLeadsComponent },
            { path: 'deals', component: CDealsComponent },
            { path: 'create-deal', component: CCreateDealComponent },
        ],
    },
    {
        path: 'project-management-page',
        component: ProjectManagementPageComponent,
        children: [
            { path: '', component: PmProjectOverviewComponent },
            { path: 'projects-list', component: PmProjectsListComponent },
            { path: 'create-project', component: PmCreateProjectComponent },
            { path: 'clients', component: PmClientsComponent },
            { path: 'teams', component: PmTeamsComponent },
            { path: 'kanban-board', component: PmKanbanBoardComponent },
            { path: 'users', component: PmUsersComponent },
            { path: 'create-user', component: PmCreateUserComponent },
            { path: 'edit-user', component: PmEditUserComponent },
        ],
    },
    {
        path: 'lms-page',
        component: LmsPageComponent,
        children: [
            { path: '', component: LCoursesComponent },
            { path: 'course-details', component: LCourseDetailsComponent },
            { path: 'create-course', component: LCreateCourseComponent },
            { path: 'edit-course', component: LEditCourseComponent },
            { path: 'instructors', component: LInstructorsComponent },
        ],
    },
    {
        path: 'help-desk-page',
        component: HelpDeskPageComponent,
        children: [
            { path: '', component: HdTicketsComponent },
            { path: 'ticket-details', component: HdTicketDetailsComponent },
            { path: 'agents', component: HdAgentsComponent },
            { path: 'reports', component: HdReportsComponent },
        ],
    },
    {
        path: 'events',
        component: EventsPageComponent,
        children: [
            { path: '', component: EventsListComponent },
            { path: 'event-details', component: EventDetailsComponent },
            { path: 'create-an-event', component: CreateAnEventComponent },
            { path: 'edit-an-event', component: EditAnEventComponent },
        ],
    },
    {
        path: 'invoices',
        component: InvoicesPageComponent,
        children: [
            { path: '', component: InvoicesComponent },
            { path: 'invoice-details', component: InvoiceDetailsComponent },
        ],
    },
    {
        path: 'social',
        component: SocialPageComponent,
        children: [
            {
                path: '',
                component: ProfileComponent,
                children: [
                    { path: '', component: TimelineComponent },
                    { path: 'about', component: AboutComponent },
                    { path: 'activity', component: ActivityComponent },
                ],
            },
            { path: 'settings', component: ProfileSettingsComponent },
        ],
    },
    { path: 'starter', component: StarterComponent },
    { path: 'faq', component: FaqPageComponent },
    { path: 'pricing', component: PricingPageComponent },
    { path: 'maps', component: MapsPageComponent },
    { path: 'notifications', component: NotificationsPageComponent },
    { path: 'members', component: MembersPageComponent },
    {
        path: 'users',
        component: UsersPageComponent,
        children: [
            { path: '', component: TeamMembersComponent },
            { path: 'users-list', component: UsersListComponent },
            { path: 'add-user', component: AddUserComponent },
        ],
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        children: [
            { path: '', component: UserProfileComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'projects', component: PProjectsComponent },
        ],
    },
    {
        path: 'icons',
        component: IconsComponent,
        children: [
            { path: '', component: MaterialSymbolsComponent },
            { path: 'remixicon', component: RemixiconComponent },
        ],
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            { path: '', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'lock-screen', component: LockScreenComponent },
            { path: 'confirm-email', component: ConfirmEmailComponent },
            { path: 'logout', component: LogoutComponent },
        ],
    },
    { path: 'my-profile', component: MyProfileComponent },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            { path: '', component: AccountSettingsComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'connections', component: ConnectionsComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms-conditions', component: TermsConditionsComponent },
        ],
    },
    { path: 'timeline', component: TimelinePageComponent },
    { path: 'gallery', component: GalleryPageComponent },
    { path: 'testimonials', component: TestimonialsPageComponent },
    { path: 'search', component: SearchPageComponent },
    { path: 'coming-soon', component: ComingSoonPageComponent },
    { path: 'blank-page', component: BlankPageComponent },
    { path: 'internal-error', component: InternalErrorComponent },
    { path: 'widgets', component: WidgetsComponent },
    {
        path: 'charts',
        component: ApexchartsComponent,
        children: [
            { path: '', component: LineChartsComponent },
            { path: 'area', component: AreaChartsComponent },
            { path: 'column', component: ColumnChartsComponent },
            { path: 'mixed', component: MixedChartsComponent },
            { path: 'radialbar', component: RadialBarChartsComponent },
            { path: 'radar', component: RadarChartsComponent },
            { path: 'pie', component: PieChartsComponent },
            { path: 'polar', component: PolarChartsComponent },
            { path: 'more', component: MoreChartsComponent },
        ],
    },
    {
        path: 'tables',
        component: TablesComponent,
        children: [
            { path: '', component: BasicTableComponent },
            { path: 'data-table', component: DataTableComponent },
        ],
    },
    {
        path: 'ui-kit',
        component: UiElementsComponent,
        children: [
            { path: '', component: AlertsComponent },
            { path: 'autocomplete', component: AutocompleteComponent },
            { path: 'avatars', component: AvatarsComponent },
            { path: 'accordion', component: AccordionComponent },
            { path: 'badges', component: BadgesComponent },
            { path: 'breadcrumb', component: BreadcrumbComponent },
            { path: 'button-toggle', component: ButtonToggleComponent },
            { path: 'bottom-sheet', component: BottomSheetComponent },
            { path: 'buttons', component: ButtonsComponent },
            { path: 'cards', component: CardsComponent },
            { path: 'carousels', component: CarouselsComponent },
            { path: 'checkbox', component: CheckboxComponent },
            { path: 'chips', component: ChipsComponent },
            { path: 'color-picker', component: ColorPickerComponent },
            { path: 'clipboard', component: ClipboardComponent },
            { path: 'datepicker', component: DatepickerComponent },
            { path: 'dialog', component: DialogComponent },
            { path: 'divider', component: DividerComponent },
            { path: 'drag-drop', component: DragDropComponent },
            { path: 'expansion', component: ExpansionComponent },
            { path: 'form-field', component: FormFieldComponent },
            { path: 'grid-list', component: GridListComponent },
            { path: 'input', component: InputComponent },
            { path: 'icon', component: IconComponent },
            { path: 'list', component: ListComponent },
            { path: 'listbox', component: ListboxComponent },
            { path: 'menus', component: MenusComponent },
            { path: 'pagination', component: PaginationComponent },
            { path: 'progress-bar', component: ProgressBarComponent },
            { path: 'radio', component: RadioComponent },
            { path: 'ratio', component: RatioComponent },
            { path: 'select', component: SelectComponent },
            { path: 'sidenav', component: SidenavComponent },
            { path: 'slide-toggle', component: SlideToggleComponent },
            { path: 'slider', component: SliderComponent },
            { path: 'snackbar', component: SnackbarComponent },
            { path: 'stepper', component: StepperComponent },
            { path: 'typography', component: TypographyComponent },
            { path: 'tooltip', component: TooltipComponent },
            { path: 'toolbar', component: ToolbarComponent },
            { path: 'table', component: TableComponent },
            { path: 'tabs', component: TabsComponent },
            { path: 'tree', component: TreeComponent },
            { path: 'videos', component: VideosComponent },
            { path: 'utilities', component: UtilitiesComponent },
        ],
    },
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            { path: '', component: BasicElementsComponent },
            { path: 'advanced-elements', component: AdvancedElementsComponent },
            { path: 'wizard', component: WizardComponent },
            { path: 'editors', component: EditorsComponent },
            { path: 'file-uploader', component: FileUploaderComponent },
        ],
    },
    // Here add new pages component

    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
