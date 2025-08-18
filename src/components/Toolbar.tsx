'use client'

import React from 'react'
import { Copy, FileDown, FileText, Upload, Download, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import type { Syllabus } from '@/lib/types'
import { exportToClipboard, exportToJSON, exportToDocx, exportToPDF, importFromJSON } from '@/lib/export'

interface ToolbarProps {
  syllabus: Syllabus
  onImport: (data: Partial<Syllabus>) => void
  onReset: () => void
}

export function Toolbar({ syllabus, onImport, onReset }: ToolbarProps) {
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await exportToClipboard(syllabus)
      toast({
        title: 'Copied!',
        description: 'Syllabus copied to clipboard',
      })
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      })
    }
  }

  const handleExportPDF = () => {
    try {
      exportToPDF()
      toast({
        title: 'Printing...',
        description: 'Print dialog opened for PDF export',
      })
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to open print dialog',
        variant: 'destructive',
      })
    }
  }

  const handleExportDocx = async () => {
    try {
      await exportToDocx(syllabus)
      toast({
        title: 'Export successful!',
        description: 'DOCX file downloaded',
      })
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export DOCX file',
        variant: 'destructive',
      })
    }
  }

  const handleExportJSON = () => {
    try {
      exportToJSON(syllabus)
      toast({
        title: 'Export successful!',
        description: 'JSON file downloaded',
      })
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export JSON file',
        variant: 'destructive',
      })
    }
  }

  const handleImportJSON = async () => {
    try {
      const data = await importFromJSON()
      onImport(data)
      toast({
        title: 'Import successful!',
        description: 'Syllabus data imported from JSON',
      })
    } catch (error) {
      toast({
        title: 'Import failed',
        description: 'Failed to import JSON file',
        variant: 'destructive',
      })
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default values? This will clear all your changes.')) {
      onReset()
      toast({
        title: 'Reset complete',
        description: 'Form reset to default ICT 101 values',
      })
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-background border-b sticky top-0 z-10">
      <Button onClick={handleCopy} variant="outline" size="sm">
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>

      <Button onClick={handleExportPDF} variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        Export PDF
      </Button>

      <Button onClick={handleExportDocx} variant="outline" size="sm">
        <FileDown className="h-4 w-4 mr-2" />
        Export DOCX
      </Button>

      <div className="h-6 border-l border-border mx-1" />

      <Button onClick={handleImportJSON} variant="outline" size="sm">
        <Upload className="h-4 w-4 mr-2" />
        Import JSON
      </Button>

      <Button onClick={handleExportJSON} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export JSON
      </Button>

      <div className="h-6 border-l border-border mx-1" />

      <Button onClick={handleReset} variant="outline" size="sm">
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  )
}
