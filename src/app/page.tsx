"use client"
import { Button } from "antd"
import { useAppDispatch, useAppSelector } from "../libs/redux"
import { ActSetGlobalState } from "../libs/redux/global"
import "./global.css"

const IndexPage = () => {
  const dispatch = useAppDispatch()
  const version = useAppSelector((e) => e.globalReducer.version)
  const add = () => dispatch(ActSetGlobalState({ version: (version ?? 0) + 1 }))

  return (
    <div>
      <Button onClick={() => add()}></Button>
      ver:{version}
    </div>
  )
}

export default IndexPage
