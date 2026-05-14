export interface AttendanceTypeInfo {
  attendanceTypeId: number
  orgId: number
  typeName: string
  description: string
  refrence1: string
  refrence2: string
  refrence3: any
  dateCreated: string
  lastUpdated: any
}

export interface AttendanceRecordPayload {
  employeeId?: number
  attendanceDate?: string
  attendanceDay?: number
  attendanceMonth?: number
  attendanceYear?: number
  checkInTime?: string
  checkOutTime?: string
  entryType?: boolean
  attendanceTypeId?: number
}

export interface EmployeeAttendanceInfo {
  attendanceId: number
  employeeId: number
  attendanceDate: string
  attendanceDay: number
  attendanceMonth: number
  attendanceYear: number
  checkInTime: string
  checkOutTime: string
  entryType: boolean
  dateCreated: string
  lastUpdated: string
  attendanceTypeId: number
  attendanceType: AttendanceType
  employee: Employee
}

export interface AttendanceType {
  attendanceTypeId: number
  orgId: number
  typeName: string
  description: string
  refrence1: string
  refrence2: string
  refrence3: string
  dateCreated: string
  lastUpdated: string
  attendanceRecords: AttendanceRecord[]
}

export interface AttendanceRecord {
  attendanceId: number
  employeeId: number
  attendanceDate: string
  attendanceDay: number
  attendanceMonth: number
  attendanceYear: number
  checkInTime: string
  checkOutTime: string
  entryType: boolean
  dateCreated: string
  lastUpdated: string
  attendenceTypeId: number
  attendanceType: string
  employee: Employee
}

export interface Employee {
  employeeId: number
  employeeCode: string
  fullName: string
  email: string
  phone: number
  nationalId: number
  hireDate: string
  birthDate: string
  departmentId: number
  orgId: number
  titleId: number
  bankAccount: string
  bankName: string
  refrence1: string
  refrence2: string
  refrence3: string
  refrence4: string
  refrence5: string
  refrence6: string
  refrence7: string
  refrence8: string
  refrence9: string
  refrence10: string
  active: boolean
  dateCreated: string
  lastUpdated: string
  departmentName: string
  orgName: string
  titleName: string
}
