'use client'

import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ArrayFieldProps {
  label: string
  items: string[]
  onItemChange: (index: number, value: string) => void
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  placeholder?: string
  multiline?: boolean
  required?: boolean
  description?: string
}

export function ArrayField({
  label,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  placeholder = '',
  multiline = false,
  required = false,
  description,
}: ArrayFieldProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            {multiline ? (
              <Textarea
                value={item}
                onChange={e => onItemChange(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1"
                rows={2}
              />
            ) : (
              <Input
                value={item}
                onChange={e => onItemChange(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1"
              />
            )}
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
        Add {label.toLowerCase().slice(0, -1)}
      </Button>
    </div>
  )
}
