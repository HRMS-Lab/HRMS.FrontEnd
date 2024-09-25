export interface TitleInfo {
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
export interface TitleInfoPayload{
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
}
export interface OrgChart {
    orgChartId: number;
    orgId: number;
    orgChartName: string;
    orgChartDescription: string;
    orgChartLevel: number;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    active: boolean;
    dateCreated: string; // or Date if you want it as a Date object
    lastUpdated: string; // or Date if you want it as a Date object
    org: Org;
    titles: Title[];
  }
  
  export interface Org {
    orgId: number;
    orgName: string;
    orgDescription: string;
    employeeIdstartedFrom: string;
    employeeIdlastId: string;
    nofLicense: number;
    licenseStartDate: string; // or Date if you want it as a Date object
    licenseEndDate: string; // or Date if you want it as a Date object
    logo: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    active: boolean;
    dateCreated: string; // or Date if you want it as a Date object
    lastUpdated: string; // or Date if you want it as a Date object
  }
  
  export interface Title {
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
    dateCreated: string; // or Date if you want it as a Date object
    dateUpdated: string; // or Date if you want it as a Date object
  }
  