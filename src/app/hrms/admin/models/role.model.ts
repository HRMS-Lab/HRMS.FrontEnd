export interface RoleInfo {
    roleId: number
    roleName: string
    roleDescription: string
    active: boolean
    dateCreated: string | null
    dateUpdated: string | null
  }

  export interface RolePayload {
    roleName: string
    roleDescription: string
    markInActive: boolean
  }