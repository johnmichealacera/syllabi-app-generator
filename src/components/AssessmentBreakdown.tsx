'use client'

import React from 'react'
import { Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validateAssessmentTotal } from '@/lib/validation'

interface AssessmentBreakdownProps {
  items: string[]
  onItemChange: (index: number, value: string) => void
  onAddItem: () => void
  onRemoveItem: (index: number) => void
}

export function AssessmentBreakdown({
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: AssessmentBreakdownProps) {
  const validation = validateAssessmentTotal(items)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Assessment Breakdown <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-2">
          {validation.isValid ? (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              Total: {validation.total}%
            </div>
          ) : (
            <div className="flex items-center gap-1 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              Total: {validation.total}%
              {validation.remaining > 0 && ` (Need +${validation.remaining}%)`}
              {validation.remaining < 0 && ` (Over by ${Math.abs(validation.remaining)}%)`}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Use format: &quot;Item Name – XX%&quot; (e.g., &quot;Major Exams – 40%&quot;)
      </p>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={e => onItemChange(index, e.target.value)}
              placeholder="Assessment Item – XX%"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onRemoveItem(index)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={onAddItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add assessment item
      </Button>

      {!validation.isValid && (
        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border">
          <strong>Note:</strong> Assessment items should total exactly 100%.
        </div>
      )}
    </div>
  )
}
