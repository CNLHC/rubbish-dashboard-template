import { Layout, theme } from "antd"
import { useDarkControl } from "./dark-mode"
import { ActionIcon } from "@mantine/core"
import { IconSun, IconMoon } from "@tabler/icons-react"

const ThemeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useDarkControl()
  return (
    <ActionIcon
      onClick={() => setIsDarkMode(!isDarkMode)}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {isDarkMode ? (
        <IconMoon className={""} stroke={1.5} />
      ) : (
        <IconSun className={""} stroke={1.5} />
      )}
    </ActionIcon>
  )
}

const MainHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout.Header
      style={{ height: "48px", background: colorBgContainer }}
      className="px-4"
    >
      <div className="h-full p-0 flex items-center justify-end w-full">
        <ThemeSwitcher />
      </div>
    </Layout.Header>
  )
}

export default MainHeader
