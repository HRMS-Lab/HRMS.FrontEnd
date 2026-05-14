export interface DeductionInfo {
  payDeductId: number
  orgId: number
  deductionName: string
  deductionDesc: string
  refrence: string
  sysInfID: number | null
  active: boolean
  dateCreated: string
  dateUpdated: string
}

export interface DeductionPayload {
  orgId: number
  deductionName: string
  deductionDesc: string
  refrence: string
  sysInfID: number
}