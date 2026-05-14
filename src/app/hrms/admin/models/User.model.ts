export interface UserInfo {
    userID: number
    orgID: number
    orgName: string
    fullName: string
    userName: string
    securityGroupId: number
    securityGroupName: string
    isSuperviser: boolean
    active: boolean
    dateCreated: string
  }

  export interface UserPayload {
    orgID: number
    fullName: string
    userName: string
    password: string
    securityGroupId: number
  }

  export interface ActivityPayload {
    active: boolean
  }