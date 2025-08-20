import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Syllabus, TermBlock } from './types'

interface SyllabusStore {
  syllabus: Syllabus
  setSyllabus: (syllabus: Partial<Syllabus>) => void
  updateField: <K extends keyof Syllabus>(field: K, value: Syllabus[K]) => void
  updateArrayField: <K extends keyof Syllabus>(
    field: K,
    index: number,
    value: Syllabus[K] extends Array<infer T> ? T : never
  ) => void
  addArrayItem: <K extends keyof Syllabus>(
    field: K,
    value: Syllabus[K] extends Array<infer T> ? T : never
  ) => void
  removeArrayItem: <K extends keyof Syllabus>(field: K, index: number) => void
  updateTermRow: (termIndex: number, rowIndex: number, row: Partial<TermBlock['rows'][0]>) => void
  addTermRow: (termIndex: number) => void
  removeTermRow: (termIndex: number, rowIndex: number) => void
  resetToDefaults: () => void
  importFromJSON: (data: Partial<Syllabus>) => void
}

// ICT 101 default data
const defaultSyllabus: Syllabus = {
  institutionName: 'BUCAS GRANDE FOUNDATION COLLEGE',
  institutionAddress: 'C. TARUC STREET, BRGY. TARUC, SOCORRO, SURIGAO DEL NORTE',

  courseCode: 'ICT 101',
  courseTitle: 'Introduction to Computer Technology',
  courseCredit: '3 Units',
  contactHours: '3 hours/week',
  prerequisite: 'None',

  visionText:
    'A premier academic institution responsible for quality instruction and training for sustainable socio-economic, environmental, and cultural advancement of Bucas Grande and the global Philippines.',

  missionBullets: [
    'Holistic Education;',
    'Competent faculty and staff;',
    'Meaningful learning experience;',
    'Modern school facilities;',
    'Culture of research;',
    'Community services;',
    'Administrative efficiency and;',
    'Financial sustainability.',
  ],

  institutionObjectives: [
    'Increase enrollment by 50%;',
    'Have 60% full-time faculty members;',
    'Have at least 60% of the full-time and part-time faculty completed master\'s degree in line with specialization;',
    'Offer basic education, senior high school, agriculture, fisheries, environmental science, tourism and graduate programs;',
    'Achieve at least level I accreditation of any program;',
    'Conduct and publish at least five relevant researchers based on the BGFC research agenda;',
    'Involve 100% of the faculty in research and research related activities;',
    'Strengthen research capability building of BGFC;',
    'Identify and develop at least three community extension programs;',
    'Develop computerized integrated system for enrollment, accounting, library and school formation management;',
    'Provide at least 18,000 entry level salary for full-time faculty;',
    'Acquisition of relevant instructional facilities (financial viability, scholarship, faculty and staff development program, linkages and alliances)',
    'At least 50% passing rate in the board course program',
  ],

  courseDescription:
    'This course introduces the fundamentals of computer technology, including computer components, software, networks, internet applications, productivity tools, and emerging digital trends. Students will explore how computers power modern work, creativity, and communication through hands-on activities using AI tools (ChatGPT, Leonardo AI), design platforms (Canva), and basic productivity applications. Emphasis is placed on problem-solving, digital ethics, and adapting to rapid technological changes.',

  learningOutcomes: [
    'Explain the fundamental concepts of computer hardware, software, and networks.',
    'Use productivity tools for creating documents, presentations, and data reports.',
    'Apply safe and ethical practices in using technology and the internet.',
    'Demonstrate basic skills in AI-assisted content creation.',
    'Use visual design platforms to present ideas effectively.',
    'Identify current and emerging technologies and their applications in society.',
    'Collaborate on a small project integrating learned tools and concepts.',
  ],

  terms: [
    {
      name: 'Prelim',
      rows: [
        {
          week: 'Week 1',
          topics: 'Introduction to Computers & Technology',
          outcomes: 'Identify basic computer parts, functions, and types.',
          activities: 'Lecture + Physical/virtual demo of PC parts',
        },
        {
          week: 'Week 2',
          topics: 'Software & Operating Systems',
          outcomes: 'Distinguish system vs application software.',
          activities: 'Hands-on: Navigating OS features',
        },
        {
          week: 'Week 3',
          topics: 'The Internet & Networking Basics',
          outcomes: 'Explain how the internet works, identify network types.',
          activities: 'Diagram activity',
        },
        {
          week: 'Week 4',
          topics: 'Productivity Tools (Docs, Sheets, Slides)',
          outcomes: 'Create basic documents, spreadsheets, and presentations.',
          activities: 'Quiz + mini-doc creation',
        },
        {
          week: 'Week 5',
          topics: 'Digital Citizenship & Ethics',
          outcomes: 'Apply safe online practices.',
          activities: 'Case study discussion',
        },
        {
          week: 'Week 6',
          topics: 'Prelim Exam',
          outcomes: '—',
          activities: 'Written + Practical',
        },
      ],
    },
    {
      name: 'Midterm',
      rows: [
        {
          week: 'Week 7',
          topics: 'Introduction to AI Tools (ChatGPT)',
          outcomes: 'Craft effective prompts for text generation.',
          activities: 'Hands-on: Prompt writing',
        },
        {
          week: 'Week 8',
          topics: 'AI for Creative Work (Leonardo AI)',
          outcomes: 'Generate AI images from text prompts.',
          activities: 'Class demo + image creation',
        },
        {
          week: 'Week 9',
          topics: 'Visual Design with Canva',
          outcomes: 'Create posters/presentations using templates.',
          activities: 'Design challenge',
        },
        {
          week: 'Week 10',
          topics: 'Integrating AI & Design',
          outcomes: 'Combine ChatGPT, Leonardo AI, Canva in a workflow.',
          activities: 'Class activity: mini-project',
        },
        {
          week: 'Week 11',
          topics: 'Midterm Exam',
          outcomes: '—',
          activities: 'Project + Quiz',
        },
      ],
    },
    {
      name: 'Pre-Final',
      rows: [
        {
          week: 'Week 12',
          topics: 'Computer Security Basics',
          outcomes: 'Identify threats and protective measures.',
          activities: 'Simulation / scenario activity',
        },
        {
          week: 'Week 13',
          topics: 'Cloud Computing & Online Collaboration',
          outcomes: 'Use cloud storage & shared docs effectively.',
          activities: 'Group work in Google Drive',
        },
        {
          week: 'Week 14',
          topics: 'Current & Emerging Technologies',
          outcomes: 'Identify and explain examples like VR, IoT, blockchain.',
          activities: 'Group research & presentation',
        },
        {
          week: 'Week 15',
          topics: 'Pre-Final Exam',
          outcomes: '—',
          activities: 'Written + Practical',
        },
      ],
    },
    {
      name: 'Final',
      rows: [
        {
          week: 'Week 16',
          topics: 'Final Project Development',
          outcomes: 'Plan & create a simple digital project.',
          activities: 'Group consultation',
        },
        {
          week: 'Week 17',
          topics: 'Final Project Presentation',
          outcomes: 'Showcase AI + design workflow.',
          activities: 'Class presentation',
        },
        {
          week: 'Week 18',
          topics: 'Final Exam & Reflection',
          outcomes: 'Reflect on skills learned.',
          activities: 'Written + reflection essay',
        },
      ],
    },
  ],

  teachingActivities: [
    'Lectures & Discussions – Concept explanations',
    'Hands-on Labs – AI tools, Canva, productivity apps',
    'Case Studies – Ethical and real-world tech use',
    'Collaborative Projects – Group creative outputs',
    'Presentations – Showcasing applied skills',
  ],

  assessmentBreakdown: [
    'Major Exams (Prelim, Midterm, Pre-Final, Final) – 40%',
    'Class Standing (attendance, participation, recitation) – 20%',
    'Quizzes – 20%',
    'Project – 15%',
    'Attendance – 5%',
  ],

  referencesYearFilter: '2021+',
  referencesList: [
    'Shelly, G., & Vermaat, M. (2021). Discovering Computers. Cengage.',
    'ChatGPT Documentation (OpenAI)',
    'Leonardo AI Documentation',
    'Canva Design School',
    'Online cybersecurity awareness resources',
    'Current articles & videos on emerging technologies',
  ],


  effectivity: 'A.Y: 2025-2026 1st Semester',

  preparedByName: 'JOHN MICHEAL M. ACERA',
  preparedByTitle: 'FACULTY',
  reviewedByName: 'RHEA JEAN G. BELSONDRA, MIT',
  reviewedByTitle: 'DEAN COLLEGE OF INFORMATION TECHNOLOGY',
  notedByName: 'MAYLONA B. PALEN',
  notedByTitle: 'VP FOR ACADEMICS',
  approvedByName: 'Atty. Ralna Dela Peña',
  approvedByTitle: 'BGFC School President',
}

export const useSyllabusStore = create<SyllabusStore>()(
  persist(
    set => ({
      syllabus: defaultSyllabus,

      setSyllabus: syllabus =>
        set(state => ({
          syllabus: { ...state.syllabus, ...syllabus },
        })),

      updateField: (field, value) =>
        set(state => ({
          syllabus: { ...state.syllabus, [field]: value },
        })),

      updateArrayField: (field, index, value) =>
        set(state => {
          const array = [...(state.syllabus[field] as Array<unknown>)]
          array[index] = value
          return {
            syllabus: { ...state.syllabus, [field]: array },
          }
        }),

      addArrayItem: (field, value) =>
        set(state => ({
          syllabus: {
            ...state.syllabus,
            [field]: [...(state.syllabus[field] as Array<unknown>), value],
          },
        })),

      removeArrayItem: (field, index) =>
        set(state => {
          const array = [...(state.syllabus[field] as Array<unknown>)]
          array.splice(index, 1)
          return {
            syllabus: { ...state.syllabus, [field]: array },
          }
        }),

      updateTermRow: (termIndex, rowIndex, row) =>
        set(state => {
          const terms = [...state.syllabus.terms]
          const term = { ...terms[termIndex] }
          const rows = [...term.rows]
          rows[rowIndex] = { ...rows[rowIndex], ...row }
          term.rows = rows
          terms[termIndex] = term
          return {
            syllabus: { ...state.syllabus, terms },
          }
        }),

      addTermRow: termIndex =>
        set(state => {
          const terms = [...state.syllabus.terms]
          const term = { ...terms[termIndex] }
          const newWeekNumber = term.rows.length + 1
          const newRow = {
            week: `Week ${newWeekNumber}`,
            topics: '',
            outcomes: '',
            activities: '',
          }
          term.rows = [...term.rows, newRow]
          terms[termIndex] = term
          return {
            syllabus: { ...state.syllabus, terms },
          }
        }),

      removeTermRow: (termIndex, rowIndex) =>
        set(state => {
          const terms = [...state.syllabus.terms]
          const term = { ...terms[termIndex] }
          const rows = [...term.rows]
          rows.splice(rowIndex, 1)
          term.rows = rows
          terms[termIndex] = term
          return {
            syllabus: { ...state.syllabus, terms },
          }
        }),

      resetToDefaults: () =>
        set({
          syllabus: defaultSyllabus,
        }),

      importFromJSON: data =>
        set(state => ({
          syllabus: { ...state.syllabus, ...data },
        })),
    }),
    {
      name: 'bgfc-syllabus-storage',
      version: 1,
    }
  )
)
