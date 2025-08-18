# BGFC Syllabus Generator

A production-ready web application for generating submission-ready syllabi in the exact Bucas Grande Foundation College (BGFC) format.

## Features

- **Live Preview**: Real-time formatted syllabus preview with monospace font
- **Strict BGFC Format**: Exact adherence to institutional syllabus requirements
- **Multiple Export Options**:
  - Copy to clipboard (formatted text)
  - PDF export via print dialog
  - DOCX file download
  - JSON data export/import
- **Smart Validation**:
  - Assessment breakdown totals (must equal 100%)
  - References year filtering (e.g., "2021+", "2020-2023")
  - Required field validation
- **Persistent Data**: Automatic localStorage saving
- **Pre-loaded Defaults**: ICT 101 example for immediate use

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Lucide React icons
- **State Management**: Zustand with persistence
- **Form Validation**: Zod schema validation
- **Export Libraries**: 
  - `docx` for DOCX generation
  - `react-to-print` for PDF export
  - `file-saver` for downloads
- **Development**: ESLint + Prettier

## Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Start building your syllabus**:
   - The app loads with ICT 101 example data
   - Edit the form on the left
   - See live preview on the right
   - Use toolbar buttons to export/copy

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript compilation check

## Usage Guide

### Form Sections

The syllabus form is organized into collapsible sections:

1. **Institution Information** - College name and address
2. **Course Information** - Code, title, credits, hours, prerequisites
3. **Vision, Mission & Objectives** - Institutional statements
4. **Course Description & Learning Outcomes** - Course overview and objectives
5. **Week-by-Week Outline** - Four terms (Prelim, Midterm, Pre-Final, Final)
6. **Teaching Activities & Assessment** - Methods and grade breakdown
7. **References** - Bibliography with year filtering
8. **Document Information & Signatures** - Revision dates and approval signatures

### Export/Import Options

#### Copy to Clipboard
- Click "Copy" to copy formatted text
- Paste directly into documents

#### PDF Export
- Click "Export PDF" to open print dialog
- Use browser's "Save as PDF" option
- Optimized for A4 with proper margins

#### DOCX Export
- Click "Export DOCX" to download Word document
- Preserves monospace formatting and line breaks
- Compatible with Microsoft Word and LibreOffice

#### JSON Import/Export
- **Export**: Save current form data as JSON
- **Import**: Load previously saved JSON data
- Useful for templates and backups

### Assessment Breakdown Validation

The assessment section enforces a 100% total:
- ✅ Green checkmark when total equals 100%
- ⚠️ Warning when total is not 100%
- Shows remaining percentage needed

Format: `"Item Name – XX%"` (e.g., "Major Exams – 40%")

### References Year Filtering

Filter references by publication year:
- `2021+` - Include 2021 and later
- `2020-2023` - Include years 2020 through 2023
- `>=2022` - Include 2022 and later
- `2021` - Include only 2021

References without years are always included.

### Week-by-Week Editor

Each term (Prelim, Midterm, Pre-Final, Final) has:
- Dynamic week rows with add/remove functionality
- Auto-incrementing week numbers
- Fields: Week, Topics, Learning Outcomes, Activities/Assessment

### Data Persistence

- Form data automatically saves to browser localStorage
- Data persists between sessions
- Use "Reset" button to restore ICT 101 defaults

## BGFC Format Specifications

The generated syllabus follows the exact BGFC institutional format:

- Header with institution name and address
- Course information block
- Vision/Mission/Objectives sections
- Course description and learning outcomes
- Week-by-week tables with tab-separated columns
- Teaching activities and assessment breakdown
- References section with year filtering
- Footer with revision dates and signature blocks

**Critical formatting elements**:
- Exact section separators: `________________________________________`
- Tab characters (`\t`) between week-by-week columns
- Proper line spacing and indentation
- Monospace font for consistency

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main application page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── ArrayField.tsx      # Dynamic list editor
│   ├── AssessmentBreakdown.tsx  # Assessment validation
│   ├── SyllabusForm.tsx    # Main form component
│   ├── SyllabusPreview.tsx # Live preview component
│   ├── Toolbar.tsx         # Export/import buttons
│   └── WeekTableEditor.tsx # Week-by-week editor
├── lib/
│   ├── export.ts           # Export/import functions
│   ├── format.ts           # BGFC text formatter
│   ├── store.ts            # Zustand state management
│   ├── types.ts            # TypeScript definitions
│   ├── utils.ts            # Utility functions
│   └── validation.ts       # Zod schemas and validators
└── styles/
    └── globals.css         # Global styles and print CSS
```

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Deploy** to your preferred platform:
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Your own server

## Browser Compatibility

- **Modern browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Mobile**: Responsive design works on tablets and phones
- **Print**: Optimized for PDF generation in all major browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run lint && npm run type-check`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Check the GitHub issues page
- Review this README for common solutions
- Contact the BGFC development team

---

**Built with ❤️ for Bucas Grande Foundation College**
