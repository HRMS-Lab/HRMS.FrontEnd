export interface OragnizationInfo {
    orgId: number;
    orgName: string;
    orgDescription: string;
    employeeIdstartedFrom: string;
    employeeIdlastId: number;
    nofLicense: number;
    licenseStartDate: string;
    licenseEndDate: string;
    logo: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    active: boolean;
    dateCreated: string;
    lastUpdated: string;
}

export interface OrganizationInfo {
    departmentName: string;
    departmentDescription: string;
    org: string;
    refrence1: string;
    refrence2: string;
    active: string; // Adjust type if needed
    dateCreated: string; // Adjust type if needed
    departmentId: number;
    action: {
        view: string;
        edit: string;
        delete: string;
    };
}
export interface OrganizationInfoPayload {
    departmentName: string;
    departmentDescription: string;
    org: { orgName: string };
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    active: boolean;
    orgId: number;
}
export interface OrganizationInfoDetails {
    active: boolean; // The active status of the department
    dateCreated: string; // The date when the department was created
    departmentDescription: string; // A description of the department
    departmentId: number; // The unique identifier for the department
    departmentName: string; // The name of the department
    employees: any[]; // An array to store employees (use a specific type if available)
    lastUpdated: string | null; // The last updated date or null if not available
    org: string | null; // The organization associated with the department (can be null)
    orgId: number; // The unique identifier for the organization
    orgName: string; // The name of the organization
    refrence1: string; // refrence field 1
    refrence2: string; // refrence field 2
    refrence3: string; // refrence field 3
    refrence4: string; // refrence field 4
    refrence5: string; // refrence field 5
}
