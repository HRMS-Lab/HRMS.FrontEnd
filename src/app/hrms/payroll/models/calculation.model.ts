export interface GetCalculationInfo {
    payClacHeaderID: number
    orgID: number
    description: string
    month: number
    year: number
    posted: boolean
    payClacDateTime: string
}

export interface CalculationInfo {
    fullName: string
    payClacHeaderID: number
    employeeID: number
    netSalary: number
    grossSalary: number
    totalEarning: number
    totalDeduction: number
}

export interface CalculationHeaderPayload {
    orgID: number
    description: string
    month: number
    year: number
}

export interface CalculationHeaderInfo {
    newPayClacHeaderID: number
    "Number of contracts affected": number
}

export interface CalculationPayload {
    payClacHeaderID: number
}
