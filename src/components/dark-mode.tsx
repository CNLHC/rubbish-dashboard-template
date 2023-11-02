import { useMantineColorScheme } from "@mantine/core"
import React, { useCallback } from "react"

export const DarkCtx = React.createContext<{
  isDarkMode: boolean
  setIsDarkMode: (f: boolean) => void
} | null>(null)

export const useDarkControl = () => {
  const { isDarkMode, setIsDarkMode } = React.useContext(DarkCtx)!
  const { setColorScheme: setMantineColorScheme} =
    useMantineColorScheme()
  const _setIsDarkMode = useCallback(
    (dark: boolean) => {
      setMantineColorScheme(dark ? "dark" : "light")
      setIsDarkMode(dark)
    },

    [ setIsDarkMode, setMantineColorScheme]
  )
  return { isDarkMode, setIsDarkMode: _setIsDarkMode }
}
