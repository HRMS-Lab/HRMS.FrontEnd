
export interface AdminProjectInfo {
    userId: number
    userName: string
    projects: Project[]
}

export interface Project {
    projectId: number
    projectName: string
    active: boolean
}

export interface AdminProjectPayload {
    adminId: number;
    projectIds: number[];
}

export interface ChangeStatusPayload {
    adminId: number
    projectIds: number[]
    isActive: boolean
  }