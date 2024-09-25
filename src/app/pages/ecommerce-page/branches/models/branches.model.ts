export interface BranchesInfo {
    branchId: number;
    districtId: number;
    branchName: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    lat: string;
    long: string;
    dateCreated: string; // ISO date string
    lastUpdated: string; // ISO date string
    active: boolean;
}
export interface BranchesInfoPayload {}
export interface BranchesInfoDetails {
    branchId: number;
    districtId: number;
    branchName: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    lat: string;
    long: string;
    dateCreated: string; // ISO date string
    lastUpdated: string; // ISO date string
    active: boolean;
}
