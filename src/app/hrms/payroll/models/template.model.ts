export interface TemplateInfo {
    payTempHeadId: number
    orgId: number
    templateName: string
    templateDesc: string
    refrence: string
    active: boolean
    headerDateCreated: string
    headerDateUpdated: string
    payTempLinesId: number
    payTempHeaderId: number
    payEarningId: number
    payDeductId: number
    lineDateCreated: string
    lineDateUpdated: string
  }

  export interface TemplatePayload {
    orgId: number
    templateName: string
    templateDesc: string
    refrence: string
    payrollTemplateLines: PayrollTemplateLine[]
  }
  
  export interface PayrollTemplateLine {
    payInfID: number
    amount: number
  }