export interface DisclaimerInfo {
    disclaimerId: number
    orgId: number
    disclaimerTypeId: number
    disclaimerDate: string
    disclaimerDateFrom: string
    reasonOfDisclaimer: string
    employeeId: number
    status: number
    wfId: number
    active: boolean
    dateCreated: string
    dateUpdated: string
    fullName: string
    disclaimerTypeName: string
}

export interface DisclaimerPayload {
    orgId: number
    disclaimerTypeId: number
    disclaimerDate: string
    disclaimerDateFrom: string
    reasonOfDisclaimer: string
    employeeId: number
}
export interface DisclaimerTypeInfo {
    disclaimerTypeId: number
    orgId: number
    disclaimerTypeName: string
    disclaimerDescription: string
    active: boolean
    dateCreated: string
    lastUpdated: string
  }