import { Document, Packer, Paragraph, TextRun, AlignmentType, ImageRun } from 'docx'
import { saveAs } from 'file-saver'
import type { Syllabus } from './types'
import { buildFinalText } from './format'
import { copyToClipboard } from './utils'

/**
 * Copy syllabus text to clipboard
 */
export async function exportToClipboard(syllabus: Syllabus): Promise<void> {
  const text = buildFinalText(syllabus)
  await copyToClipboard(text)
}

/**
 * Export syllabus as JSON
 */
export function exportToJSON(syllabus: Syllabus): void {
  const json = JSON.stringify(syllabus, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${syllabus.courseCode}_syllabus.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Import syllabus from JSON file
 */
export function importFromJSON(): Promise<Partial<Syllabus>> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) {
        reject(new Error('No file selected'))
        return
      }

      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          resolve(data)
        } catch (error) {
          reject(new Error('Invalid JSON file'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    }

    input.click()
  })
}

/**
 * Export syllabus as DOCX
 */
export async function exportToDocx(syllabus: Syllabus): Promise<void> {
  // Fetch the school logo image
  let logoImage: ImageRun | undefined
  try {
    const response = await fetch('/school-logo.png')
    const arrayBuffer = await response.arrayBuffer()
    logoImage = new ImageRun({
      data: arrayBuffer,
      transformation: {
        width: 70,
        height: 70,
      },
    })
  } catch (error) {
    console.warn('Could not load school logo for DOCX export:', error)
  }

  const doc = new Document({
    sections: [
      {
        children: [
          // Header with school name, logo, and address
          new Paragraph({
            children: [
              new TextRun({
                text: syllabus.institutionName,
                font: 'Arial',
                size: 32, // 16pt
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: syllabus.institutionAddress,
                font: 'Arial',
                size: 24, // 12pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),
          // Logo paragraph (if logo was loaded successfully)
          ...(logoImage ? [
            new Paragraph({
              children: [logoImage],
              alignment: AlignmentType.CENTER,
              spacing: { after: 360 }, // 18pt after
            })
          ] : []),

          // Course Information Section
          new Paragraph({
            children: [
              new TextRun({
                text: `Course Code: ${syllabus.courseCode}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Course Credit: ${syllabus.courseCredit}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Contact Hours: ${syllabus.contactHours}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Prerequisite: ${syllabus.prerequisite}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Course Title: ${syllabus.courseTitle}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 240 }, // 12pt after
          }),

          // Vision Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'VISION',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: syllabus.visionText,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 240 }, // 12pt after
          }),

          // Mission Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'MISSION',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'To provide academic and operational excellence vis-a-vis:',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          // Mission bullets
          ...syllabus.missionBullets.map(bullet => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${bullet}`,
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 60 }, // 3pt after
            })
          ),
          new Paragraph({
            children: [
              new TextRun({
                text: '',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),

          // Objectives Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'OBJECTIVES',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'BGFC shall:',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          // Objectives bullets
          ...syllabus.institutionObjectives.map(objective => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${objective}`,
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 60 }, // 3pt after
            })
          ),

          // Separator line
          new Paragraph({
            children: [
              new TextRun({
                text: '________________________________________',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),

          // Course Description Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Course Description',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: syllabus.courseDescription,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 240 }, // 12pt after
          }),

          // Separator line
          new Paragraph({
            children: [
              new TextRun({
                text: '________________________________________',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),

          // Learning Outcomes Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Course Learning Outcomes',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'By the end of the semester, students will be able to:',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          // Learning outcomes numbered list
          ...syllabus.learningOutcomes.map((outcome, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${outcome}`,
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 60 }, // 3pt after
            })
          ),

          // Separator line
          new Paragraph({
            children: [
              new TextRun({
                text: '________________________________________',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),

          // Week-by-Week Outline Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Week-by-Week Outline',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 240 }, // 12pt after
          }),

          // Render each term block
          ...syllabus.terms.flatMap(term => [
            new Paragraph({
              children: [
                new TextRun({
                  text: term.name,
                  font: 'Arial',
                  size: 24, // 12pt
                  bold: true,
                }),
              ],
              spacing: { after: 120 }, // 6pt after
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Week\tTopics\tIntended Learning Outcomes\tActivities / Assessment',
                  font: 'Arial',
                  size: 22, // 11pt
                  bold: true,
                }),
              ],
              spacing: { after: 120 }, // 6pt after
            }),
            // Term rows
            ...term.rows.map(row => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${row.week}\t${row.topics}\t${row.outcomes}\t${row.activities}`,
                    font: 'Arial',
                    size: 22, // 11pt
                  }),
                ],
                spacing: { after: 60 }, // 3pt after
              })
            ),
            // Separator after each term
            new Paragraph({
              children: [
                new TextRun({
                  text: '________________________________________',
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 240 }, // 12pt after
            }),
          ]),

          // Teaching Activities Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Teaching & Learning Activities',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          ...syllabus.teachingActivities.map(activity => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${activity}`,
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 60 }, // 3pt after
            })
          ),

          // Separator line
          new Paragraph({
            children: [
              new TextRun({
                text: '________________________________________',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),

          // Assessment Breakdown Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Assessment Breakdown',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          ...syllabus.assessmentBreakdown.map(assessment => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${assessment}`,
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 60 }, // 3pt after
            })
          ),

          // Separator line
          new Paragraph({
            children: [
              new TextRun({
                text: '________________________________________',
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }, // 12pt after
          }),

          // References Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'References',
                font: 'Arial',
                size: 24, // 12pt
                bold: true,
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          ...syllabus.referencesList.map(reference => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${reference}`,
                  font: 'Arial',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 60 }, // 3pt after
            })
          ),

          // Document Info
          new Paragraph({
            children: [
              new TextRun({
                text: `Date Revised: ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Effectivity: ${syllabus.effectivity}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 240 }, // 12pt after
          }),

          // Signatures Section
          new Paragraph({
            children: [
              new TextRun({
                text: `Prepared by: ${syllabus.preparedByName}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 60 }, // 3pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `\t\t${syllabus.preparedByTitle}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Reviewed by: ${syllabus.reviewedByName}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 60 }, // 3pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `\t\t${syllabus.reviewedByTitle}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Noted by:      ${syllabus.notedByName}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 60 }, // 3pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `\t            ${syllabus.notedByTitle}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Approved by: ${syllabus.approvedByName}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 60 }, // 3pt after
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `\t\t${syllabus.approvedByTitle}`,
                font: 'Arial',
                size: 22, // 11pt
              }),
            ],
            spacing: { after: 120 }, // 6pt after
          }),
        ],
        properties: {
          page: {
            size: {
              width: 15840, // 11 inches in twips
              height: 12240, // 8.5 inches in twips (landscape)
            },
            margin: {
              top: 720, // 0.5 inch
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
      },
    ],
  })

  try {
    const blob = await Packer.toBlob(doc)
    saveAs(blob, `${syllabus.courseCode}_syllabus.docx`)
  } catch (error) {
    console.error('Failed to export DOCX:', error)
    throw new Error('Failed to export DOCX file')
  }
}

/**
 * Trigger print dialog for PDF export
 */
export function exportToPDF(): void {
  window.print()
}
