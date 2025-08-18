import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BGFC Syllabus Generator',
  description: 'Production-ready web app for generating BGFC formatted syllabi',
  keywords: ['syllabus', 'BGFC', 'education', 'curriculum', 'generator'],
  authors: [{ name: 'BGFC Development Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster>
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </Toaster>
      </body>
    </html>
  )
}
