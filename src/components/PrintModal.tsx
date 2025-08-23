'use client'

import React from 'react'
import type { Syllabus } from '@/lib/types'
import { buildFinalText } from '@/lib/format'
import Image from 'next/image'

interface PrintModalProps {
  syllabus: Syllabus
  isOpen: boolean
  onClose: () => void
}

export function PrintModal({ syllabus, isOpen, onClose }: PrintModalProps) {
  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div 
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold">Print Syllabus</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polyline points="6,9 6,2 18,2 18,9"></polyline>
                  <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"></path>
                  <polyline points="6,14,6,18,6,22,18,22,18,18,18,14"></polyline>
                </svg>
                Print
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
              >
                Close
              </button>
            </div>
          </div>

          {/* Syllabus Content */}
          <div className="p-6 overflow-auto max-h-[calc(90vh-80px)] print-content">
            {/* Header with Logo - Optimized for Landscape */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <Image
                  src="/school-logo.png"
                  alt="School Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold mb-1">
                {syllabus.institutionName}
              </h1>
              <p className="text-base text-gray-600">
                {syllabus.institutionAddress}
              </p>
            </div>

            {/* Syllabus Content - Optimized for Landscape */}
            <div className="space-y-4">
              {/* Course Information */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Course Code:</strong> {syllabus.courseCode}</div>
                <div><strong>Course Credit:</strong> {syllabus.courseCredit}</div>
                <div><strong>Contact Hours:</strong> {syllabus.contactHours}</div>
                <div><strong>Prerequisite:</strong> {syllabus.prerequisite}</div>
              </div>
              <div><strong>Course Title:</strong> {syllabus.courseTitle}</div>

              {/* Vision */}
              <div>
                <h2 className="text-lg font-bold mb-1">VISION</h2>
                <p className="text-sm">{syllabus.visionText}</p>
              </div>

              {/* Mission */}
              <div>
                <h2 className="text-lg font-bold mb-1">MISSION</h2>
                <p className="text-sm">To provide academic and operational excellence vis-a-vis:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                  {syllabus.missionBullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Objectives */}
              <div>
                <h2 className="text-lg font-bold mb-1">OBJECTIVES</h2>
                <p className="text-sm">BGFC shall:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                  {syllabus.institutionObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <hr className="border-t-2 border-gray-300" />

              {/* Course Description */}
              <div>
                <h2 className="text-lg font-bold mb-1">Course Description</h2>
                <p className="text-sm">{syllabus.courseDescription}</p>
              </div>

              <hr className="border-t-2 border-gray-300" />

              {/* Learning Outcomes */}
              <div>
                <h2 className="text-lg font-bold mb-1">Course Learning Outcomes</h2>
                <p className="text-sm">By the end of the semester, students will be able to:</p>
                <ol className="list-decimal list-inside mt-1 space-y-0.5 text-sm">
                  {syllabus.learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ol>
              </div>

              <hr className="border-t-2 border-gray-300" />

              {/* Week-by-Week Outline */}
              <div>
                <h2 className="text-lg font-bold mb-2">Week-by-Week Outline</h2>
                {syllabus.terms.map((term, termIndex) => (
                  <div key={termIndex} className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">{term.name}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Week</th>
                            <th className="border border-gray-300 p-2 text-left">Topics</th>
                            <th className="border border-gray-300 p-2 text-left">Intended Learning Outcomes</th>
                            <th className="border border-gray-300 p-2 text-left">Activities / Assessment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {term.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="border border-gray-300 p-2">{row.week}</td>
                              <td className="border border-gray-300 p-2">{row.topics}</td>
                              <td className="border border-gray-300 p-2">{row.outcomes}</td>
                              <td className="border border-gray-300 p-2">{row.activities}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-t-2 border-gray-300" />

              {/* Teaching Activities */}
              <div>
                <h2 className="text-lg font-bold mb-1">Teaching & Learning Activities</h2>
                <ul className="list-disc list-inside space-y-0.5 text-sm">
                  {syllabus.teachingActivities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>

              <hr className="border-t-2 border-gray-300" />

              {/* Assessment Breakdown */}
              <div>
                <h2 className="text-lg font-bold mb-1">Assessment Breakdown</h2>
                <ul className="list-disc list-inside space-y-0.5 text-sm">
                  {syllabus.assessmentBreakdown.map((assessment, index) => (
                    <li key={index}>{assessment}</li>
                  ))}
                </ul>
              </div>

              <hr className="border-t-2 border-gray-300" />

              {/* References */}
              <div>
                <h2 className="text-lg font-bold mb-1">References</h2>
                <ul className="list-disc list-inside space-y-0.5 text-sm">
                  {syllabus.referencesList.map((reference, index) => (
                    <li key={index}>{reference}</li>
                  ))}
                </ul>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Date Revised:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</div>
                <div><strong>Effectivity:</strong> {syllabus.effectivity}</div>
              </div>

              {/* Signatures */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p><strong>Prepared by:</strong> {syllabus.preparedByName}</p>
                    <p className="ml-4">{syllabus.preparedByTitle}</p>
                  </div>
                  <div>
                    <p><strong>Reviewed by:</strong> {syllabus.reviewedByName}</p>
                    <p className="ml-4">{syllabus.reviewedByTitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p><strong>Noted by:</strong> {syllabus.notedByName}</p>
                    <p className="ml-4">{syllabus.notedByTitle}</p>
                  </div>
                  <div>
                    <p><strong>Approved by:</strong> {syllabus.approvedByName}</p>
                    <p className="ml-4">{syllabus.approvedByTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
