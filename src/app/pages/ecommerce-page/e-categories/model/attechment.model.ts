

export interface AttachmentInfo {
    attachmentId: number;
    attachTypeID: number;
    employeeId: number;
    attachmnts: any | null;  // You can change `any` to the specific type if known
    active: boolean;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    dateCreated: string;  // Can also use Date if you want to handle as Date object
    lastUpdated: string | null;  // Can also use Date if 
    action: {
        view: string;
        edit: string;
        delete: string;
    };
}
export interface AttachmentInfoPayload {
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
export interface AttachmentInfoDetails {
   attachmentId: number;
    attachTypeID: number;
    employeeId: number;
    attachmnts: any | null;  // You can change `any` to the specific type if known
    active: boolean;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    dateCreated: string;  // Can also use Date if you want to handle as Date object
    lastUpdated: string | null;  // Can also use Date if 
}
