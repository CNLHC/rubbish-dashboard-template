import { Layout, Switch, theme } from "antd"
import { useContext } from "react"
import { DarkCtx } from "./dark-mode"

const MainHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { isDarkMode, setIsDarkMode } = useContext(DarkCtx)!

  return (
    <Layout.Header
      style={{ padding: 0, height: "48px", background: colorBgContainer }}
    >
      <div className="h-full p-2 flex items-center justify-end">
        <Switch
          checked={isDarkMode}
          onChange={(e) => setIsDarkMode(e)}
          checkedChildren="暗色"
          unCheckedChildren="亮色"
        />
      </div>
    </Layout.Header>
  )
}

export default MainHeader
