export interface SecurityGroupInfo {
    securityGroupId: number
    orgId: number
    securityGroupName: string
    active: boolean
    createdDate: string
    lastUpdated: string
  }

  export interface SecurityGroupPayload {
    id: number
    orgId: number
    securityGroupName: string
    active: boolean
  }

  export interface UpdateSecurityGroupPayload {
    active: boolean
    id: number
  }