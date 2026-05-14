export interface EmployeeProjectInfoList {
  employeeId: number
  employeeCode: number
  fullName: number
  projectName: string
}
export interface EmployeeProjectInfo {
    empProjId: number
    projectId: number
    employeeId: number
    reasonOfChange: string
    refrence1: string
    refrence2: string
    refrence3: string
    refrence4: string
    refrence5: string
    active: boolean
    dateCreated: string
    lastUpdated: string
  }
  export interface EmployeeProjectInfoPayload {
    projectId: number
    employeeId: number
    reasonOfChange: string
    refrence1: string
    refrence2: string
    refrence3: string
    refrence4: string
    refrence5: string
    active: boolean
  }