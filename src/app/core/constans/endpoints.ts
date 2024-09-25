import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
export class Endpoints {
    static readonly ORGANIZATION = `${environment.baseUrl}/hrms/api/Organization/GetOrganizations`;
    static readonly GETORGANIZATION = `${environment.baseUrl}/hrms/api/Organization/GetOrganization/`;
    static readonly CREATEORGANIZATIONS = `${environment.baseUrl}/hrms/api/Organization/CreateOrganization`;
    static readonly UPDATEORGANIZATIONS = `${environment.baseUrl}/hrms/api/Organization/UpdateOrganization`;

    static readonly DEPARTMENTS = `${environment.baseUrl}/hrms/api/Department/GetDepartments/`;
    static readonly GETDEPARTMENT = `${environment.baseUrl}/hrms/api/Department/GetDepartment/`;
    static readonly CREATEDEPARTMENTS = `${environment.baseUrl}/hrms/api/Department/CreateDepartment`;
    static readonly UPDATEDEPARTMENTS = `${environment.baseUrl}/hrms/api/Department/UpdateDepartment`;

    static readonly GETEMPLOYEE = `${environment.baseUrl}/hrms/api/Employee/GetEmployee/`;
    static readonly EMPLOYEES = `${environment.baseUrl}/hrms/api/Employee/GetEmployees`;
    static readonly CREATEEMPLOYEES = `${environment.baseUrl}/hrms/api/Employee/CreateEmployee`;
    static readonly UPDATEEMPLOYEES = `${environment.baseUrl}/hrms/api/Employee/UpdateEmployee`;

    static readonly TITLES = `${environment.baseUrl}/hrms/api/Title/GetTitles`;
    static readonly GETTITLE = `${environment.baseUrl}/hrms/api/Title/GetTitle/`;
    static readonly CREATETITLES = `${environment.baseUrl}/hrms/api/Title/CreateTitle`;
    static readonly UPDATETITLES = `${environment.baseUrl}/hrms/api/Title/UpdateTitle`;

    static readonly ORGCHART = `${environment.baseUrl}/hrms/api/OrganizationChart/GetOrganizationCharts/`;

    static readonly ATTECHMENTS = `${environment.baseUrl}/hrms/api/Attachment/GetAttachments/`;
    static readonly ATTECHMENTSTYPES = `${environment.baseUrl}/hrms/api/AttachType/GetAttachTypes/`;
    static readonly GETATTECHMENT = `${environment.baseUrl}/hrms/api/Attachment/GetAttachment/`;
    static readonly CREATEATTECHMENTS = `${environment.baseUrl}/hrms/api/Attachment/CreateAttachment`;
    static readonly UPDATEATTECHMENTS = `${environment.baseUrl}/hrms/api/Attachment/UpdateAttachment`;

    static readonly GETREGOIN = `${environment.baseUrl}/hrms/api/Region/GetRegion/`;
    static readonly CREATEREGOIN = `${environment.baseUrl}/hrms/api/Region/CreateRegion`;
    static readonly UPDATEREGOIN = `${environment.baseUrl}/hrms/api/Region/UpdateRegion`;

    static readonly GETADRESSES = `${environment.baseUrl}/hrms/api/Address/GetAddress/`;
    static readonly CREATEADRESSES = `${environment.baseUrl}/hrms/api/Address/CreateAddress`;
    static readonly UPDATEADRESSES = `${environment.baseUrl}/hrms/api/Address/UpdateAddress`;

    static readonly GETDISTRICT = `${environment.baseUrl}/hrms/api/District/GetDistrict/`;
    static readonly CREATEDISTRICT = `${environment.baseUrl}/hrms/api/District/CreateDistrict`;
    static readonly UPDATEDISTRICT = `${environment.baseUrl}/hrms/api/District/UpdateDistrict`;

    static readonly BRANCHE = `${environment.baseUrl}/hrms/api/Branch/GetBranchs/`;
    static readonly GETBRANCH = `${environment.baseUrl}/hrms/api/Branch/GetBranch/`;
    static readonly CREATEBRANCHES = `${environment.baseUrl}/hrms/api/Branch/CreateBranch`;
    static readonly UPDATEBRANCHES = `${environment.baseUrl}/hrms/api/Branch/UpdateBranch`;

}