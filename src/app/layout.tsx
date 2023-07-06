"use client"
import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import MainLayout from "../components/main-layout"
import ProgressBar from "../components/progress-bar"
import { store } from "../libs/redux"

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
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
            }}
          />
        </head>
        <body style={{ visibility: !mounted ? "hidden" : "visible" }}>
          <ProgressBar />
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </Provider>
  )
}
