"use client"
import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import MainLayout from "../components/main-layout"
import ProgressBar from "../components/progress-bar"
import { store } from "../libs/redux"
import "./global.css"
import { ConfigProvider, theme } from "antd"
import classNames from "classnames"
import { DarkCtx } from "../components/dark-mode"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"

import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "@mantine/tiptap/styles.css"
import "@mantine/dropzone/styles.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [isDarkMode, setIsDarkMode] = useState(true)
  const { defaultAlgorithm, darkAlgorithm } = theme

  return (
    <DarkCtx.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Provider store={store}>
          <html lang="en" className={classNames({ dark: isDarkMode })}>
            <head>
              <ColorSchemeScript />
            </head>
            <body style={{ visibility: !mounted ? "hidden" : "visible" }}>
              <MantineProvider>
                <ProgressBar />
                <MainLayout>{children}</MainLayout>
              </MantineProvider>
            </body>
          </html>
        </Provider>
      </ConfigProvider>
    </DarkCtx.Provider>
  )
}
