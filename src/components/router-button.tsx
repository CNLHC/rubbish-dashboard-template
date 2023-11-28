"use client"
import { Button, ButtonProps } from "@mantine/core"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"

const RouterButton = (props: ButtonProps & { goto: string }) => {
  const router = useRouter()
  return (
    <Button
      {...props}
      onClick={useCallback(() => {
        router.push(props.goto)
      }, [])}
    >
      Go To Admin
    </Button>
  )
}

export default RouterButton
