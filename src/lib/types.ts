export type WeekRow = {
  week: number | string
  topics: string
  outcomes: string
  activities: string
}

export type TermBlock = {
  name: 'Prelim' | 'Midterm' | 'Pre-Final' | 'Final'
  rows: WeekRow[]
}

export type Syllabus = {
  institutionName: string
  institutionAddress: string

  courseCode: string
  courseTitle: string
  courseCredit: string
  contactHours: string
  prerequisite: string

  visionText: string
  missionBullets: string[]
  institutionObjectives: string[]

  courseDescription: string
  learningOutcomes: string[]

  terms: TermBlock[] // exactly four blocks in order

  teachingActivities: string[]
  assessmentBreakdown: string[] // strings like "Major Exams – 40%"

  referencesYearFilter: string // e.g., "2021+"
  referencesList: string[]

  dateRevised: string // formatted date string e.g. Aug. 14, 2025
  effectivity: string

  preparedByName: string
  preparedByTitle: string
  reviewedByName: string
  reviewedByTitle: string
  notedByName: string
  notedByTitle: string
  approvedByName: string
  approvedByTitle: string
}

export type ExportFormat = 'copy' | 'pdf' | 'docx' | 'json'
export type ImportFormat = 'json'

export type ValidationError = {
  field: string
  message: string
}

export type AssessmentValidation = {
  total: number
  isValid: boolean
  remaining: number
}
