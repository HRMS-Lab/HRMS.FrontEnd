export interface TitleInfo {
  titleId: number
  titleName: string
  titleDescription: string
  orgId: number
  refrence1: string
  refrence2: string
  refrence3: string
  refrence4: string
  refrence5: string
  orgChartId: number
  active: boolean
  dateCreated: string
  dateUpdated: string
}

export interface TitlePayload {
  titleName: string
  titleDescription: string
  orgId: number
  refrence1: string
  refrence2: string
  refrence3: string
  refrence4: string
  refrence5: string
  orgChartId: number
  active: boolean
}