'use client'

import React from 'react'
import type { Syllabus } from '@/lib/types'
import { buildFinalText } from '@/lib/format'

interface SyllabusPreviewProps {
  syllabus: Syllabus
}

export function SyllabusPreview({ syllabus }: SyllabusPreviewProps) {
  const formattedText = buildFinalText(syllabus)

  return (
    <div className="h-full flex flex-col">
      <div className="bg-muted/50 px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <p className="text-sm text-muted-foreground">
          Formatted syllabus ready for copy/print/export
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div id="syllabus-preview" className="print-container">
          <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words p-6 bg-white border-0">
            {formattedText}
          </pre>
        </div>
      </div>
    </div>
  )
}
