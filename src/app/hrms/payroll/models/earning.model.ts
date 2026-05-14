export interface EarningInfo {
  payEarningId: number
  orgId: number
  earningName: string
  earningDesc: string
  refrence: string
  active: boolean
  dateCreated: string
  dateUpdated: string
}

export interface EarningPayload {
  orgId: number
  earningName: string
  earningDesc: string
  refrence: string
}


