'use client'

import React from 'react'
import { useSyllabusStore } from '@/lib/store'
import { Toolbar } from '@/components/Toolbar'
import { SyllabusPreview } from '@/components/SyllabusPreview'
import { SyllabusForm } from '@/components/SyllabusForm'

export default function HomePage() {
  const { syllabus, importFromJSON, resetToDefaults } = useSyllabusStore()

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">BGFC Syllabus Generator</h1>
          <p className="text-sm opacity-90">
            Create submission-ready syllabi for Bucas Grande Foundation College
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar
        syllabus={syllabus}
        onImport={importFromJSON}
        onReset={resetToDefaults}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Panel */}
        <div className="w-1/2 border-r flex flex-col">
          <div className="flex-1 overflow-auto">
            <SyllabusForm />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 flex flex-col">
          <SyllabusPreview syllabus={syllabus} />
        </div>
      </div>
    </div>
  )
}
