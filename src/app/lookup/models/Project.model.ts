export interface ProjectInfo {
    projectId: number
    projectName: string
    projectDescription: string
    orgId: number
    refrence1: string
    refrence2: string
    refrence3: string
    refrence4: string
    refrence5: string
    active: boolean
    dateCreated: string
    dateUpdated: string
    orgName: string
}
export interface ProjectInfoPayload {
    projectName: string
    projectDescription: string
    orgId: number
    refrence1: string
    refrence2: string
    refrence3: string
    refrence4: string
    refrence5: string
    active: boolean
}