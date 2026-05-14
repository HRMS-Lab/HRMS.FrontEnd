import { TitleInfo } from "./title.model"

export interface OrgChartInfo {
  orgChartId: number
  orgId: number
  orgChartName: string
  orgChartDescription: string
  orgChartLevel: number
  refrence1: string
  refrence2: string
  refrence3: string
  refrence4: string
  refrence5: string
  active: boolean
  dateCreated: string
  lastUpdated: string
  org: OrgInfo
  titles: TitleInfo[]
}

export interface OrgInfo {
  orgId: number
  orgName: string
  orgDescription: string
  employeeIdstartedFrom: string
  employeeIdlastId: string
  nofLicense: number
  licenseStartDate: string
  licenseEndDate: string
  logo: string
  refrence1: string
  refrence2: string
  refrence3: string
  refrence4: string
  refrence5: string
  active: boolean
  dateCreated: string
  lastUpdated: string
}