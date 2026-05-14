export interface ContractInfo {
    payContHeadID: number
    employeeID: number
    employeeName: string
    payTempHeadID: number
    startDate: string
    endDate: string
    descrption: string
    active: boolean
    dateCreated: string
    dateUpdated: string
    contractLinesjson: ContractLinesjson
  }
  
  export interface ContractLinesjson {
    Earning: ContractEarning[]
    Deduction: ContractDeduction[]
  }
  
  export interface ContractEarning {
    PayContLineID: number
    PayTempLinesID: number
    AmountTemp: number
    Amount: number
    AmountOverride: boolean
    Type: string
  }
  
  export interface ContractDeduction {
    PayContLineID: number
    PayTempLinesID: number
    AmountTemp: number
    Amount: number
    AmountOverride: boolean
    Type: string
  }

export interface ContractPayload {
    employeeID: number
    payTempHeadID: number
    startDate: string
    endDate: string
    descrption: string
    active: boolean
    lines: ContractLine[]
}

export interface ContractLine {
    payTempLinesID: number
    amountTemp: number
    amount: number
}