export interface SecurityRoleInfo {
    secRoleId: number
    secGroupId: number
    securityGroupName: string
    roleId: number
    roleName: string
    dateCreated: string
    dateUpdated: string
  }

  export interface SecurityRolePayload {
    secRoleId?: number | null
    secGroupId?: number | null
    roleId?: number | null
  }