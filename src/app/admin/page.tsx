"use client"
import { Button, Statistic, notification } from "antd"
import { useAppDispatch, useAppSelector } from "../../libs/redux"
import { ActSetGlobalState } from "../../libs/redux/global"
import { useTRPC } from "../../libs/utils"
import { useAsync } from "react-use"

const IndexPage = () => {
  const dispatch = useAppDispatch()
  const version = useAppSelector((e) => e.globalReducer.version)
  const add = () => dispatch(ActSetGlobalState({ version: (version ?? 0) + 1 }))
  const { cli } = useTRPC()
  useAsync(async () => {
    await cli.health.query()
    notification.success({
      message: "Use Effect will render twice in the production! 😠 ",
    })
  }, [])

  return (
    <div>
      <Button onClick={() => add()}> Click To Add</Button>
      <Statistic title={"counter"} value={version} />
    </div>
  )
}

export default IndexPage
