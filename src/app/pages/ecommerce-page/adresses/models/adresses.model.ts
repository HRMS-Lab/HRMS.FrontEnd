export interface AdressesInfo {
    addressId: number;
    employeeId: number;
    address1: string;
    regionId: number;
    city: string;
    state: string;
    zipCode: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    active: boolean;
    regionName: string;
    dateCreated: string; // or Date if you're using Date objects
    lastUpdated: string; // or Date if you're using Date objects
}

export interface AdressesInfoPayload {
 
}
export interface AdressesInfoDetails {
    addressId: number;
    employeeId: number;
    address1: string;
    regionId: number;
    city: string;
    state: string;
    zipCode: string;
    refrence1: string;
    refrence2: string;
    refrence3: string;
    refrence4: string;
    refrence5: string;
    active: boolean;
    regionName: string;
    dateCreated: string; // or Date if you're using Date objects
    lastUpdated: string; // or Date if you're using Date objects
}
