export interface UserInterfaceRoleInfo {
    uiId: number
    uiRoleId: number
    roleId: number
    roleName: string
    active: boolean
    dateCreated: string
    dateUpdated: string
  }
  
  export interface UserInterfaceRolePayload {
    uiId: number
    roleId: number
    active: boolean
  }