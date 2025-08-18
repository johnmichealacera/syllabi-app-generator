'use client'

import React from 'react'
import { useSyllabusStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrayField } from '@/components/ArrayField'
import { WeekTableEditor } from '@/components/WeekTableEditor'
import { AssessmentBreakdown } from '@/components/AssessmentBreakdown'

export function SyllabusForm() {
  const {
    syllabus,
    updateField,
    updateArrayField,
    addArrayItem,
    removeArrayItem,
    updateTermRow,
    addTermRow,
    removeTermRow,
  } = useSyllabusStore()

  return (
    <div className="p-6 space-y-6">
      <Accordion type="multiple" defaultValue={['course-info', 'description', 'week-by-week']} className="space-y-4">
        {/* Institution Header */}
        <AccordionItem value="institution">
          <AccordionTrigger>Institution Information</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label htmlFor="institution-name">Institution Name</Label>
              <Input
                id="institution-name"
                value={syllabus.institutionName}
                onChange={e => updateField('institutionName', e.target.value)}
                placeholder="Bucas Grande Foundation College"
              />
            </div>
            <div>
              <Label htmlFor="institution-address">Institution Address</Label>
              <Textarea
                id="institution-address"
                value={syllabus.institutionAddress}
                onChange={e => updateField('institutionAddress', e.target.value)}
                placeholder="C. TARUC STREET, BRGY. TARUC, SOCORRO, SURIGAO DEL NORTE"
                rows={2}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Course Info */}
        <AccordionItem value="course-info">
          <AccordionTrigger>Course Information</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course-code">Course Code *</Label>
                <Input
                  id="course-code"
                  value={syllabus.courseCode}
                  onChange={e => updateField('courseCode', e.target.value)}
                  placeholder="ICT 101"
                />
              </div>
              <div>
                <Label htmlFor="course-credit">Course Credit *</Label>
                <Input
                  id="course-credit"
                  value={syllabus.courseCredit}
                  onChange={e => updateField('courseCredit', e.target.value)}
                  placeholder="3 Units"
                />
              </div>
              <div>
                <Label htmlFor="contact-hours">Contact Hours *</Label>
                <Input
                  id="contact-hours"
                  value={syllabus.contactHours}
                  onChange={e => updateField('contactHours', e.target.value)}
                  placeholder="3 hours/week"
                />
              </div>
              <div>
                <Label htmlFor="prerequisite">Prerequisite</Label>
                <Input
                  id="prerequisite"
                  value={syllabus.prerequisite}
                  onChange={e => updateField('prerequisite', e.target.value)}
                  placeholder="None"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="course-title">Course Title *</Label>
              <Input
                id="course-title"
                value={syllabus.courseTitle}
                onChange={e => updateField('courseTitle', e.target.value)}
                placeholder="Introduction to Computer Technology"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Vision/Mission/Objectives */}
        <AccordionItem value="vision-mission">
          <AccordionTrigger>Vision, Mission & Objectives</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label htmlFor="vision">Vision Statement *</Label>
              <Textarea
                id="vision"
                value={syllabus.visionText}
                onChange={e => updateField('visionText', e.target.value)}
                placeholder="Institution's vision statement..."
                rows={3}
              />
            </div>

            <ArrayField
              label="Mission Bullets"
              items={syllabus.missionBullets}
              onItemChange={(index, value) => updateArrayField('missionBullets', index, value)}
              onAddItem={() => addArrayItem('missionBullets', '')}
              onRemoveItem={index => removeArrayItem('missionBullets', index)}
              placeholder="Mission statement item..."
              required
            />

            <ArrayField
              label="Institution Objectives"
              items={syllabus.institutionObjectives}
              onItemChange={(index, value) => updateArrayField('institutionObjectives', index, value)}
              onAddItem={() => addArrayItem('institutionObjectives', '')}
              onRemoveItem={index => removeArrayItem('institutionObjectives', index)}
              placeholder="Institutional objective..."
              required
            />
          </AccordionContent>
        </AccordionItem>

        {/* Course Description */}
        <AccordionItem value="description">
          <AccordionTrigger>Course Description & Learning Outcomes</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label htmlFor="course-description">Course Description *</Label>
              <Textarea
                id="course-description"
                value={syllabus.courseDescription}
                onChange={e => updateField('courseDescription', e.target.value)}
                placeholder="This course introduces..."
                rows={4}
              />
            </div>

            <ArrayField
              label="Learning Outcomes"
              items={syllabus.learningOutcomes}
              onItemChange={(index, value) => updateArrayField('learningOutcomes', index, value)}
              onAddItem={() => addArrayItem('learningOutcomes', '')}
              onRemoveItem={index => removeArrayItem('learningOutcomes', index)}
              placeholder="By the end of this course, students will be able to..."
              multiline
              required
            />
          </AccordionContent>
        </AccordionItem>

        {/* Week-by-Week */}
        <AccordionItem value="week-by-week">
          <AccordionTrigger>Week-by-Week Outline</AccordionTrigger>
          <AccordionContent className="space-y-6">
            {syllabus.terms.map((term, termIndex) => (
              <WeekTableEditor
                key={term.name}
                title={term.name}
                rows={term.rows}
                onRowChange={(rowIndex, field, value) => 
                  updateTermRow(termIndex, rowIndex, { [field]: value })
                }
                onAddRow={() => addTermRow(termIndex)}
                onRemoveRow={rowIndex => removeTermRow(termIndex, rowIndex)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Teaching Activities & Assessment */}
        <AccordionItem value="activities-assessment">
          <AccordionTrigger>Teaching Activities & Assessment</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <ArrayField
              label="Teaching & Learning Activities"
              items={syllabus.teachingActivities}
              onItemChange={(index, value) => updateArrayField('teachingActivities', index, value)}
              onAddItem={() => addArrayItem('teachingActivities', '')}
              onRemoveItem={index => removeArrayItem('teachingActivities', index)}
              placeholder="Teaching/learning activity..."
              multiline
              required
            />

            <AssessmentBreakdown
              items={syllabus.assessmentBreakdown}
              onItemChange={(index, value) => updateArrayField('assessmentBreakdown', index, value)}
              onAddItem={() => addArrayItem('assessmentBreakdown', '')}
              onRemoveItem={index => removeArrayItem('assessmentBreakdown', index)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* References */}
        <AccordionItem value="references">
          <AccordionTrigger>References</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <Label htmlFor="references-filter">Year Filter</Label>
              <Input
                id="references-filter"
                value={syllabus.referencesYearFilter}
                onChange={e => updateField('referencesYearFilter', e.target.value)}
                placeholder="2021+ or 2020-2023 or >=2022"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Filter references by year. Examples: &quot;2021+&quot; (2021 and later), &quot;2020-2023&quot; (range), &quot;&gt;=2022&quot;
              </p>
            </div>

            <ArrayField
              label="References List"
              items={syllabus.referencesList}
              onItemChange={(index, value) => updateArrayField('referencesList', index, value)}
              onAddItem={() => addArrayItem('referencesList', '')}
              onRemoveItem={index => removeArrayItem('referencesList', index)}
              placeholder="Author, A. (2021). Title. Publisher."
              multiline
              required
            />
          </AccordionContent>
        </AccordionItem>

        {/* Footer Info */}
        <AccordionItem value="footer">
          <AccordionTrigger>Document Information & Signatures</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-revised">Date Revised *</Label>
                <Input
                  id="date-revised"
                  value={syllabus.dateRevised}
                  onChange={e => updateField('dateRevised', e.target.value)}
                  placeholder={formatDate(new Date())}
                />
              </div>
              <div>
                <Label htmlFor="effectivity">Effectivity *</Label>
                <Input
                  id="effectivity"
                  value={syllabus.effectivity}
                  onChange={e => updateField('effectivity', e.target.value)}
                  placeholder="A.Y: 2025-2026 1st Semester"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prepared-name">Prepared By Name *</Label>
                <Input
                  id="prepared-name"
                  value={syllabus.preparedByName}
                  onChange={e => updateField('preparedByName', e.target.value)}
                  placeholder="JOHN MICHEAL M. ACERA"
                />
              </div>
              <div>
                <Label htmlFor="prepared-title">Prepared By Title *</Label>
                <Input
                  id="prepared-title"
                  value={syllabus.preparedByTitle}
                  onChange={e => updateField('preparedByTitle', e.target.value)}
                  placeholder="FACULTY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewed-name">Reviewed By Name *</Label>
                <Input
                  id="reviewed-name"
                  value={syllabus.reviewedByName}
                  onChange={e => updateField('reviewedByName', e.target.value)}
                  placeholder="RHEA JEAN G. BELSONDRA, MIT"
                />
              </div>
              <div>
                <Label htmlFor="reviewed-title">Reviewed By Title *</Label>
                <Input
                  id="reviewed-title"
                  value={syllabus.reviewedByTitle}
                  onChange={e => updateField('reviewedByTitle', e.target.value)}
                  placeholder="DEAN COLLEGE OF INFORMATION TECHNOLOGY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="noted-name">Noted By Name *</Label>
                <Input
                  id="noted-name"
                  value={syllabus.notedByName}
                  onChange={e => updateField('notedByName', e.target.value)}
                  placeholder="MAYLONA B. PALEN"
                />
              </div>
              <div>
                <Label htmlFor="noted-title">Noted By Title *</Label>
                <Input
                  id="noted-title"
                  value={syllabus.notedByTitle}
                  onChange={e => updateField('notedByTitle', e.target.value)}
                  placeholder="VP FOR ACADEMICS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="approved-name">Approved By Name *</Label>
                <Input
                  id="approved-name"
                  value={syllabus.approvedByName}
                  onChange={e => updateField('approvedByName', e.target.value)}
                  placeholder="Atty. Ralna Dela Peña"
                />
              </div>
              <div>
                <Label htmlFor="approved-title">Approved By Title *</Label>
                <Input
                  id="approved-title"
                  value={syllabus.approvedByTitle}
                  onChange={e => updateField('approvedByTitle', e.target.value)}
                  placeholder="BGFC School President"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
