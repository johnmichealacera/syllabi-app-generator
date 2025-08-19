'use client'

import React from 'react'
import type { Syllabus } from '@/lib/types'
import { buildFinalText } from '@/lib/format'
import Image from 'next/image'

interface SyllabusPreviewProps {
  syllabus: Syllabus
}

export function SyllabusPreview({ syllabus }: SyllabusPreviewProps) {
  const formattedText = buildFinalText(syllabus)

  return (
    <div className="h-full flex flex-col">
      <div className="bg-muted/50 px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Live Preview</h2>
            <p className="text-sm text-muted-foreground">
              Formatted syllabus ready for copy/print/export
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <polyline points="6,9 6,2 18,2 18,9"></polyline>
              <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
              <polyline points="6,14,6,18,6,22,18,22,18,18,18,14"></polyline>
            </svg>
            Print Syllabus
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div id="syllabus-preview" className="print-container">
          {/* Header with Logo */}
          <div className="bg-white p-6 border-b syllabus-header">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-center mb-2">
                {syllabus.institutionName}
              </h1>
              <p className="text-center text-gray-600">
                {syllabus.institutionAddress}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <Image
                src="/school-logo.png"
                alt="School Logo"
                width={80}
                height={80}
                className="object-contain syllabus-logo"
              />
            </div>
          </div>
          
          {/* Plain Text Preview */}
          <div className="p-6 plain-text-section">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Plain Text Format (for copying):</h3>
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words p-4 bg-gray-50 border rounded">
              {formattedText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
