import React from "react"

export const DarkCtx = React.createContext<{
  isDarkMode: boolean
  setIsDarkMode: (f: boolean) => void
} | null>(null)
