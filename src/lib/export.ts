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
  const text = buildFinalText(syllabus)
  const lines = text.split('\n')

  // Fetch the school logo image
  let logoImage: ImageRun | undefined
  try {
    const response = await fetch('/school-logo.png')
    const arrayBuffer = await response.arrayBuffer()
    logoImage = new ImageRun({
      data: arrayBuffer,
      transformation: {
        width: 80,
        height: 80,
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
          // Add the rest of the content
          ...lines.map(line => {
            // Handle tabs in week-by-week tables
            if (line.includes('\t')) {
              const parts = line.split('\t')
              return new Paragraph({
                children: parts.map((part, index) => [
                  new TextRun({
                    text: part,
                    font: 'Courier New',
                    size: 22, // 11pt
                  }),
                  // Add tab space except for last part
                  ...(index < parts.length - 1 ? [new TextRun({ text: '\t', font: 'Courier New', size: 22 })] : []),
                ]).flat(),
                spacing: { after: 120 }, // 6pt after
              })
            }

            // Regular lines
            return new Paragraph({
              children: [
                new TextRun({
                  text: line || ' ', // Preserve empty lines
                  font: 'Courier New',
                  size: 22, // 11pt
                }),
              ],
              spacing: { after: 120 }, // 6pt after
            })
          }),
        ],
        properties: {
          page: {
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
