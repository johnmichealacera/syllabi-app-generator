'use client'

import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { WeekRow } from '@/lib/types'

interface WeekTableEditorProps {
  title: string
  rows: WeekRow[]
  onRowChange: (index: number, field: keyof WeekRow, value: string | number) => void
  onAddRow: () => void
  onRemoveRow: (index: number) => void
}

export function WeekTableEditor({
  title,
  rows,
  onRowChange,
  onAddRow,
  onRemoveRow,
}: WeekTableEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">{title}</Label>
        <Button type="button" variant="outline" size="sm" onClick={onAddRow}>
          <Plus className="h-4 w-4 mr-2" />
          Add Week
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          No weeks added yet. Click &quot;Add Week&quot; to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((row, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Week {index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveRow(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`week-${index}`} className="text-xs text-muted-foreground">
                    Week
                  </Label>
                  <Input
                    id={`week-${index}`}
                    value={row.week}
                    onChange={e => onRowChange(index, 'week', e.target.value)}
                    placeholder="Week 1"
                  />
                </div>

                <div>
                  <Label htmlFor={`topics-${index}`} className="text-xs text-muted-foreground">
                    Topics
                  </Label>
                  <Input
                    id={`topics-${index}`}
                    value={row.topics}
                    onChange={e => onRowChange(index, 'topics', e.target.value)}
                    placeholder="Topic for this week"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`outcomes-${index}`} className="text-xs text-muted-foreground">
                  Intended Learning Outcomes
                </Label>
                <Textarea
                  id={`outcomes-${index}`}
                  value={row.outcomes}
                  onChange={e => onRowChange(index, 'outcomes', e.target.value)}
                  placeholder="What students will learn..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor={`activities-${index}`} className="text-xs text-muted-foreground">
                  Activities / Assessment
                </Label>
                <Textarea
                  id={`activities-${index}`}
                  value={row.activities}
                  onChange={e => onRowChange(index, 'activities', e.target.value)}
                  placeholder="Activities and assessments..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
