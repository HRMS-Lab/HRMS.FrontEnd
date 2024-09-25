export interface RegoinsInfo {
    regionId: number;
    regionName: string;
    regionDescription: string;
    orgId: number;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    lat: string;
    long: string;
    active: boolean;
    dateCreated: string; // ISO format date
    lastUpdated: string; // ISO format date
}

export interface RegoinInfoPayload {
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
export interface RegoinInfoDetails {
    regionId: number;
    regionName: string;
    regionDescription: string;
    orgId: number;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    lat: string;
    long: string;
    active: boolean;
    dateCreated: string; // ISO format date
    lastUpdated: string; // ISO format date
}
