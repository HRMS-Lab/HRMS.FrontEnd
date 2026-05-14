import { environment } from '../../../environments/environment';

const baseUrl = environment.apiUrl;
export class Endpoints {
    static readonly ORGANIZATION = `${baseUrl}/Organization/GetOrganizations`;
    static readonly GETORGANIZATION = `${baseUrl}/Organization/GetOrganization/`;
    static readonly CREATEORGANIZATIONS = `${baseUrl}/Organization/CreateOrganization`;
    static readonly UPDATEORGANIZATIONS = `${baseUrl}/Organization/UpdateOrganization`;

    static readonly DEPARTMENTS = `${baseUrl}/Department/GetDepartments/`;
    static readonly GETDEPARTMENT = `${baseUrl}/Department/GetDepartment/`;
    static readonly CREATEDEPARTMENTS = `${baseUrl}/Department/CreateDepartment`;
    static readonly UPDATEDEPARTMENTS = `${baseUrl}/Department/UpdateDepartment`;

    static readonly GETEMPLOYEE = `${baseUrl}/Employee/GetEmployee/`;
    static readonly EMPLOYEES = `${baseUrl}/Employee/GetEmployees`;
    static readonly GET_EMPLOYEE_COUNTS = `${baseUrl}/Employee/CountEmployees/`;
    static readonly GET_EMPLOYEE_REGISTRY = `${baseUrl}/Employee/GetEmployeesRegistry`;
    static readonly CREATEEMPLOYEES = `${baseUrl}/Employee/CreateEmployee`;
    static readonly UPDATEEMPLOYEES = `${baseUrl}/Employee/UpdateEmployee`;

    static readonly TITLES = `${baseUrl}/Title/GetTitles`;
    static readonly GETTITLE = `${baseUrl}/Title/GetTitle/`;
    static readonly CREATETITLES = `${baseUrl}/Title/CreateTitle`;
    static readonly UPDATETITLES = `${baseUrl}/Title/UpdateTitle`;

    static readonly ORGCHART = `${baseUrl}/OrganizationChart/GetOrganizationCharts/`;

    static readonly ATTECHMENTS = `${baseUrl}/Attachment/GetAttachments/`;
    static readonly ATTECHMENTSTYPES = `${baseUrl}/AttachType/GetAttachTypes/`;
    static readonly GETATTECHMENT = `${baseUrl}/Attachment/GetAttachment/`;
    static readonly GETATTECHMENTBYEMPOLYEE = `${baseUrl}/Attachment/GetAttachmentsByEmployee/`;
    static readonly CREATEATTECHMENTS = `${baseUrl}/Attachment/CreateAttachment`;
    static readonly UPDATEATTECHMENTS = `${baseUrl}/Attachment/UpdateAttachment`;
    static readonly DELETEATTECHMENTS = `${baseUrl}/Attachment/DeleteAttachment`;

    static readonly GETREGOIN = `${baseUrl}/Region/GetRegion/`;
    static readonly CREATEREGOIN = `${baseUrl}/Region/CreateRegion`;
    static readonly UPDATEREGOIN = `${baseUrl}/Region/UpdateRegion`;

    static readonly GETADRESSES = `${baseUrl}/Address/GetAddress/`;
    static readonly CREATEADRESSES = `${baseUrl}/Address/CreateAddress`;
    static readonly UPDATEADRESSES = `${baseUrl}/Address/UpdateAddress`;

    static readonly GETDISTRICT = `${baseUrl}/District/GetDistrict/`;
    static readonly CREATEDISTRICT = `${baseUrl}/District/CreateDistrict`;
    static readonly UPDATEDISTRICT = `${baseUrl}/District/UpdateDistrict`;

    static readonly BRANCHE = `${baseUrl}/Branch/GetBranchs/`;
    static readonly GETBRANCH = `${baseUrl}/Branch/GetBranch/`;
    static readonly CREATEBRANCHES = `${baseUrl}/Branch/CreateBranch`;
    static readonly UPDATEBRANCHES = `${baseUrl}/Branch/UpdateBranch`;

    static readonly GET_PROJECT = `${baseUrl}/Project/GetProject/`;
    static readonly CREATE_PROJECT = `${baseUrl}/Project/CreateProject`;
    static readonly UPDATE_PROJECT = `${baseUrl}/Project/UpdateRegion`;

    static readonly GET_EMPLOYEE_PROJECT = `${baseUrl}/EmployeesProject/GetEmployeesProject`;
    static readonly CREATE_EMPLOYEE_PROJECT = `${baseUrl}/EmployeesProject/CreateEmployeesProject`;
    static readonly UPDATE_EMPLOYEE_PROJECT = `${baseUrl}/EmployeesProject/UpdateEmployeesProject`;

    // Admin
    static readonly GET_ADMIN = `${baseUrl}/Admins/GetSupervisers/`;

    // Admin projects
    static readonly GET_ADMIN_PROJECT = `${baseUrl}/AdminProjects/GetProjAdmins`;
    static readonly CREATE_ADMIN_PROJECT = `${baseUrl}/AdminProjects/AssignProjAdmin`;
    static readonly UPDATE_ADMIN_PROJECT = `${baseUrl}/AdminProjects/UpdateProjAdmins`;
    static readonly CHANGE_STATUS = `${baseUrl}/AdminProjects/ChangeStatus`;

    // Attendance
    static readonly GET_ATTENDANCE_TYPE = `${baseUrl}/AttendanceType/GetAttendanceTypes`;
    static readonly GRT_EMPLOYEE_ATTENDANCE = `${baseUrl}/AttendanceRecord/GetAttendanceRecords`;
    static readonly CREATE_ATTENDANCE = `${baseUrl}/AttendanceRecord/CreateAttendanceRecord`;

    // Disclaimer
    static readonly GET_DISCLAIMER_TYPE = `${baseUrl}/DisclaimerType/GetDisclaimerTypes`;
    static readonly GET_DISCLAIMER = `${baseUrl}/Disclaimer/GetDisclaimers/`;
    static readonly CREATE_DISCLAIMER = `${baseUrl}/Disclaimer/CreateDisclaimer`;
    static readonly UPDATE_DISCLAIMER = `${baseUrl}/Disclaimer/UpdateDisclaimerSetInactive/`;

    // Attendance Calender
    static readonly GET_CALENDER = `${baseUrl}/AttendanceCalender/GetAttendanceCalenders`;
    static readonly UPDATE_CALENDER = `${baseUrl}/AttendanceCalender/LockUnlockAttendanceCalender`;

    // Security Groups
    static readonly GET_SECURITY_GROUP = `${baseUrl}/SecurityGroups/GetSecurityGroups`;
    static readonly CREATE_SECURITY_GROUP = `${baseUrl}/SecurityGroups/CreateSecurityGroup`;
    static readonly UPDATE_SECURITY_GROUP = `${baseUrl}/SecurityGroups/UpdateSecurityGroup`;

    // Security Role
    static readonly GET_SECURITY_ROLE = `${baseUrl}/SecurityRole/GetSecurityRoles`;
    static readonly CREATE_SECURITY_ROLE = `${baseUrl}/SecurityRole/AddSecurityRole`;
    static readonly UPDATE_SECURITY_ROLE = `${baseUrl}/SecurityRole/UpdateSecurityRole/`;

    // User
    static readonly GET_USER = `${baseUrl}/User/GetUsers/`;
    static readonly CREATE_USER = `${baseUrl}/User/CreateUser`;
    static readonly CHANGE_ACTIVITY = `${baseUrl}/User/ChangeUserActivity/`;

    // User Interface
    static readonly GET_USER_INTERFACE = `${baseUrl}/UserInterfaces/GetUserInterfaces`;
    static readonly GET_USER_INTERFACE_ID = `${baseUrl}/UserInterfaces/GetUserInterface/`;
    static readonly CREATE_USER_INTERFACE = `${baseUrl}/UserInterfaces/CreateUserInterface`;
    static readonly CHANGE_UI_ACTIVITY = `${baseUrl}/UserInterfaces/ChangeUiActivity/`;

    // Role
    static readonly GET_ROLES = `${baseUrl}/Roles/GetRoles`;
    static readonly GET_ROLE_ID = `${baseUrl}/Roles/GetRole/`;
    static readonly CREATE_ROLE = `${baseUrl}/Roles/CreateRole`;
    static readonly UPDATE_ROLE = `${baseUrl}/Roles/UpdateRole/`;

    // User Interface Role
    static readonly GET_USER_INTERFACE_ROLE = `${baseUrl}/RolesUserInterface/GetRoleUserInterfaces`;
    static readonly CREATE_USER_INTERFACE_ROLE = `${baseUrl}/RolesUserInterface/CreateRolesUserInterface`;
    static readonly CHANGE_ROLE_UI_ACTIVITY = `${baseUrl}/RolesUserInterface/ChangeRoleUiActivity/`;

    // Earning
    static readonly GET_EARNING = `${baseUrl}/PayrollEarning/GetPayrollEarnings/`;
    static readonly GET_EARNING_ID = `${baseUrl}/PayrollEarning/GetPayrollEarning/`;
    static readonly CREATE_EARNING = `${baseUrl}/PayrollEarning/CreatePayrollEarning`;
    static readonly UPDATE_EARNING = `${baseUrl}/PayrollEarning/UpdatePayrollEarning`;

    // Deduction
    static readonly GET_DEDUCTION = `${baseUrl}/PayrollDeduction/GetPayrollDeductions/`;
    static readonly GET_DEDUCTION_ID = `${baseUrl}/PayrollDeduction/GetPayrollDeduction/`;
    static readonly CREATE_DEDUCTION = `${baseUrl}/PayrollDeduction/CreatePayrollDeduction`;
    static readonly UPDATE_DEDUCTION = `${baseUrl}/PayrollDeduction/UpdatePayrollDeduction`;

    // Template
    static readonly GET_TEMPLATE = `${baseUrl}/PayrollTemplate/GetPayrollTemplates/`;
    static readonly CREATE_TEMPLATE = `${baseUrl}/PayrollTemplate/CreatePayrollTemplate`;
    static readonly UPDATE_TEMPLATE = `${baseUrl}/PayrollTemplate/UpdatePayrollTemplateHeader`;

    // System Influnes
    static readonly GET_SYS_INFLUNES = `${baseUrl}/PayrollSystemInflunes/GetInflunes/`;

    // Contract
    static readonly GET_CONTRACT = `${baseUrl}/PayrollContract/GetPayrollContractWithDetails?orgId=`;
    static readonly CREATE_CONTRACT = `${baseUrl}/PayrollContract/create-contract`;

    // Calculation
    static readonly GET_CALCULATION = `${baseUrl}/PayrollCalculationHeader/GetPayrollCalculationHeader`;
    static readonly CREATE_CALCULATION_HEADER = `${baseUrl}/PayrollCalculationHeader/InsertPayrollCalculationHeader`;
    static readonly CREATE_CALCULATION = `${baseUrl}/PayrollCalculationHeader/InsertPayrollCalculations`;
}