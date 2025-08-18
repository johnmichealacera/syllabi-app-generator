import { z } from 'zod'
import type { AssessmentValidation } from './types'

// Zod schema for form validation
export const syllabusSchema = z.object({
  institutionName: z.string().min(1, 'Institution name is required'),
  institutionAddress: z.string().min(1, 'Institution address is required'),

  courseCode: z.string().min(1, 'Course code is required'),
  courseTitle: z.string().min(1, 'Course title is required'),
  courseCredit: z.string().min(1, 'Course credit is required'),
  contactHours: z.string().min(1, 'Contact hours is required'),
  prerequisite: z.string(),

  visionText: z.string().min(1, 'Vision text is required'),
  missionBullets: z.array(z.string().min(1)).min(1, 'At least one mission bullet is required'),
  institutionObjectives: z
    .array(z.string().min(1))
    .min(1, 'At least one institution objective is required'),

  courseDescription: z.string().min(1, 'Course description is required'),
  learningOutcomes: z
    .array(z.string().min(1))
    .min(1, 'At least one learning outcome is required'),

  terms: z.array(
    z.object({
      name: z.enum(['Prelim', 'Midterm', 'Pre-Final', 'Final']),
      rows: z.array(
        z.object({
          week: z.union([z.number(), z.string()]),
          topics: z.string().min(1, 'Topics is required'),
          outcomes: z.string().min(1, 'Outcomes is required'),
          activities: z.string().min(1, 'Activities is required'),
        })
      ),
    })
  ),

  teachingActivities: z
    .array(z.string().min(1))
    .min(1, 'At least one teaching activity is required'),
  assessmentBreakdown: z
    .array(z.string().min(1))
    .min(1, 'At least one assessment item is required'),

  referencesYearFilter: z.string(),
  referencesList: z.array(z.string().min(1)).min(1, 'At least one reference is required'),

  dateRevised: z.string().min(1, 'Date revised is required'),
  effectivity: z.string().min(1, 'Effectivity is required'),

  preparedByName: z.string().min(1, 'Prepared by name is required'),
  preparedByTitle: z.string().min(1, 'Prepared by title is required'),
  reviewedByName: z.string().min(1, 'Reviewed by name is required'),
  reviewedByTitle: z.string().min(1, 'Reviewed by title is required'),
  notedByName: z.string().min(1, 'Noted by name is required'),
  notedByTitle: z.string().min(1, 'Noted by title is required'),
  approvedByName: z.string().min(1, 'Approved by name is required'),
  approvedByTitle: z.string().min(1, 'Approved by title is required'),
})

export type SyllabusFormData = z.infer<typeof syllabusSchema>

/**
 * Validates assessment breakdown percentages
 */
export function validateAssessmentTotal(assessmentItems: string[]): AssessmentValidation {
  let total = 0

  for (const item of assessmentItems) {
    // Extract percentage from strings like "Major Exams – 40%"
    const match = item.match(/(\d+(?:\.\d+)?)%/)
    if (match) {
      total += parseFloat(match[1])
    }
  }

  return {
    total: Math.round(total * 100) / 100, // Round to 2 decimal places
    isValid: Math.abs(total - 100) < 0.01, // Allow for floating point precision
    remaining: Math.round((100 - total) * 100) / 100,
  }
}

/**
 * Validates references against year filter
 */
export function validateReferencesYearFilter(
  references: string[],
  yearFilter: string
): string[] {
  if (!yearFilter.trim()) {
    return references
  }

  const filtered: string[] = []

  for (const ref of references) {
    // Extract year from reference (look for 4-digit year)
    const yearMatch = ref.match(/\b(19|20)\d{2}\b/)
    
    if (!yearMatch) {
      // No year found, include it
      filtered.push(ref)
      continue
    }

    const year = parseInt(yearMatch[0])
    
    // Parse year filter patterns
    if (yearFilter.includes('+')) {
      // Pattern like "2021+"
      const minYear = parseInt(yearFilter.replace('+', ''))
      if (year >= minYear) {
        filtered.push(ref)
      }
    } else if (yearFilter.includes('-')) {
      // Pattern like "2020-2023"
      const [minStr, maxStr] = yearFilter.split('-')
      const minYear = parseInt(minStr)
      const maxYear = parseInt(maxStr)
      if (year >= minYear && year <= maxYear) {
        filtered.push(ref)
      }
    } else if (yearFilter.startsWith('>=')) {
      // Pattern like ">=2022"
      const minYear = parseInt(yearFilter.replace('>=', ''))
      if (year >= minYear) {
        filtered.push(ref)
      }
    } else if (yearFilter.startsWith('<=')) {
      // Pattern like "<=2023"
      const maxYear = parseInt(yearFilter.replace('<=', ''))
      if (year <= maxYear) {
        filtered.push(ref)
      }
    } else {
      // Exact year match
      const targetYear = parseInt(yearFilter)
      if (year === targetYear) {
        filtered.push(ref)
      }
    }
  }

  return filtered
}
