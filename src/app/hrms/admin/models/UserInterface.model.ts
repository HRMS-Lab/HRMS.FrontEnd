export interface UserInterfaceInfo {
    uiId: number
    uiActualId: number
    url: string
    uiName: string
    active: boolean
    dateCreated: string
    dateUpdated: string
  }

  export interface UserInterfacePayload {
    uiActualId: number
    url: string
    uiName: string
    active: boolean
  }