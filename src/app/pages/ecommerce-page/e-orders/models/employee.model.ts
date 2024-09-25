export interface EmployeeInfo {
    employeeId: number;
    employeeCode: string;
    fullName: string;
    email: string;
    phone: number;
    nationalId: number;
    hireDate: string; // Consider using Date type for date fields
    birthDate: string; // Consider using Date type for date fields
    departmentId: number;
    orgId: number;
    titleId: number;
    bankAccount: string;
    bankName: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    refrence6: string;
    refrence7: string;
    refrence8: string;
    refrence9: string;
    refrence10: string;
    active: boolean;
    dateCreated: string; // Consider using Date type for date fields
    lastUpdated: string; // Consider using Date type for date fields
    departmentName: string;
    orgName: string;
    titleName: string;
}
export interface EmployeeInfoPayload {
    fullName: string;
    email: string;
    phone: number;
    nationalId: number;
    hireDate: string; // Use Date if you prefer JavaScript Date objects
    birthDate: string; // Use Date if you prefer JavaScript Date objects
    departmentId: number;
    orgId: number;
    titleId: number;
    bankAccount: string;
    bankName: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    refrence6: string;
    refrence7: string;
    refrence8: string;
    refrence9: string;
    refrence10: string;
    active: boolean;
}
export interface TitlesInfo {
    titleId: number;
    titleName: string;
    titleDescription: string;
    orgId: number;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    orgChartId: number;
    active: boolean;
    dateCreated: string; // Use 'Date' type if you prefer JavaScript Date objects
    dateUpdated: string; // Use 'Date' type if you prefer JavaScript Date objects
}
