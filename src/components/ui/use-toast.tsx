'use client'

import * as React from 'react'

// Simple toast context and hook
interface ToastContextType {
  showToast: (message: { title: string; description?: string; variant?: 'default' | 'destructive' }) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = React.useCallback((message: { title: string; description?: string; variant?: 'default' | 'destructive' }) => {
    // For now, just use alert - in production you'd implement proper toast UI
    if (message.variant === 'destructive') {
      alert(`Error: ${message.title}${message.description ? ` - ${message.description}` : ''}`)
    } else {
      alert(`${message.title}${message.description ? ` - ${message.description}` : ''}`)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return {
    toast: context.showToast,
    toasts: [], // Empty for compatibility
  }
}
