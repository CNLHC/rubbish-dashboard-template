"use client"
import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import MainLayout from "../components/main-layout"
import ProgressBar from "../components/progress-bar"
import { store } from "../libs/redux"
import "./global.css"
import { Roboto_Mono } from "next/font/google"
import { ConfigProvider, theme } from "antd"
import classNames from "classnames"
import { DarkCtx } from "../components/dark-mode"
import { MantineProvider } from "@mantine/core"

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (typeof window !== "undefined") {
    window.onload = () => {
      document.getElementById("holderStyle")!.remove()
    }
  }

  const [isDarkMode, setIsDarkMode] = useState(true)
  const { defaultAlgorithm, darkAlgorithm } = theme

  return (
    <DarkCtx.Provider value={{ isDarkMode, setIsDarkMode }}>
      <MantineProvider theme={{ colorScheme: isDarkMode ? "dark" : "light" }}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}
        >
          <Provider store={store}>
            <html
              lang="en"
              className={classNames(
                roboto_mono.variable,
                { dark: isDarkMode },
                { "text-dark-text-base": isDarkMode }
              )}
            >
              <head></head>
              <body style={{ visibility: !mounted ? "hidden" : "visible" }}>
                <ProgressBar />
                <MainLayout>{children}</MainLayout>
              </body>
            </html>
          </Provider>
        </ConfigProvider>
      </MantineProvider>
    </DarkCtx.Provider>
  )
}
