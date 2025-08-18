import type { Syllabus } from './types'
import { validateReferencesYearFilter } from './validation'

/**
 * Builds the final BGFC formatted text from syllabus data
 * MUST return the exact BGFC template string with correct newlines, tabs "\t", underscores line, and no extra text.
 */
export function buildFinalText(syllabus: Syllabus): string {
  const lines: string[] = []

  // Header
  lines.push(syllabus.institutionName)
  lines.push(syllabus.institutionAddress)
  lines.push('')

  // Course info
  lines.push(`Course Code: ${syllabus.courseCode}`)
  lines.push(`Course Credit: ${syllabus.courseCredit}`)
  lines.push(`Contact Hours: ${syllabus.contactHours}`)
  lines.push(`Prerequisite: ${syllabus.prerequisite}`)
  lines.push('')

  // Vision
  lines.push('VISION')
  lines.push(syllabus.visionText)
  lines.push('')

  // Mission
  lines.push('MISSION')
  lines.push('To provide academic and operational excellence vis-a-vis:')
  syllabus.missionBullets.forEach(bullet => {
    lines.push(`- ${bullet}`)
  })
  lines.push('')

  // Objectives
  lines.push('OBJECTIVES')
  lines.push('BGFC shall:')
  syllabus.institutionObjectives.forEach(objective => {
    lines.push(`- ${objective}`)
  })

  // Section separator
  lines.push('________________________________________')

  // Course Description
  lines.push('Course Description')
  lines.push(syllabus.courseDescription)

  // Section separator
  lines.push('________________________________________')

  // Learning Outcomes
  lines.push('Course Learning Outcomes')
  lines.push('By the end of the semester, students will be able to:')
  syllabus.learningOutcomes.forEach((outcome, index) => {
    lines.push(`${index + 1}. ${outcome}`)
  })

  // Section separator
  lines.push('________________________________________')

  // Week-by-Week Outline
  lines.push('Week-by-Week Outline')

  // Render each term block
  syllabus.terms.forEach(term => {
    lines.push(term.name)
    lines.push('Week\tTopics\tIntended Learning Outcomes\tActivities / Assessment')
    
    term.rows.forEach(row => {
      lines.push(`${row.week}\t${row.topics}\t${row.outcomes}\t${row.activities}`)
    })

    // Section separator after each term
    lines.push('________________________________________')
  })

  // Teaching & Learning Activities
  lines.push('Teaching & Learning Activities')
  syllabus.teachingActivities.forEach(activity => {
    lines.push(`- ${activity}`)
  })

  // Section separator
  lines.push('________________________________________')

  // Assessment Breakdown
  lines.push('Assessment Breakdown')
  syllabus.assessmentBreakdown.forEach(assessment => {
    lines.push(`- ${assessment}`)
  })

  // References
  lines.push('References')
  const filteredReferences = validateReferencesYearFilter(
    syllabus.referencesList,
    syllabus.referencesYearFilter
  )
  filteredReferences.forEach(reference => {
    lines.push(`- ${reference}`)
  })

  lines.push(' ')

  // Footer info
  lines.push(`Date Revised: ${syllabus.dateRevised}`)
  lines.push('')
  lines.push(`Effectivity: ${syllabus.effectivity}`)
  lines.push('')

  // Signatures
  lines.push(`Prepared by: ${syllabus.preparedByName}`)
  lines.push(`\t\t${syllabus.preparedByTitle}`)
  lines.push('')
  lines.push(`Reviewed by: ${syllabus.reviewedByName}`)
  lines.push(`\t\t${syllabus.reviewedByTitle}`)
  lines.push('')
  lines.push(`Noted by:      ${syllabus.notedByName}`)
  lines.push(`\t            ${syllabus.notedByTitle}`)
  lines.push('')
  lines.push(`Approved by: ${syllabus.approvedByName} `)
  lines.push(`\t\t${syllabus.approvedByTitle}`)

  return lines.join('\n')
}
