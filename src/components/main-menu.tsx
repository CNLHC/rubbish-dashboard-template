import {
  BranchesOutlined,
  CalculatorOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DotChartOutlined,
  ExperimentOutlined,
} from "@ant-design/icons"
import { Menu, MenuProps } from "antd"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const MenuItems: MenuProps["items"] = [
  {
    key: "/",
    label: <Link href="/">首页</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "/data",
    label: <Link href="/data">数据管理</Link>,
    icon: <DatabaseOutlined />,
  },
  {
    key: "/program",
    label: <Link href="/program">计算模块</Link>,
    icon: <CalculatorOutlined />,
  },
  {
    key: "/model",
    label: <Link href="/model">仿真模型</Link>,
    icon: <DotChartOutlined />,
  },
  {
    key: "/workflow",
    label: <Link href="/workflow">业务流程</Link>,
    icon: <BranchesOutlined />,
  },
  {
    key: "/experiment",
    label: <Link href="/experiment">实验管理</Link>,
    icon: <ExperimentOutlined />,
  },
]

export default function MainMenu() {
  const path = usePathname()
  const router = useRouter()
  return (
    <Menu
      selectedKeys={[path]}
      onClick={(e) => {
        router.push(e.key)
      }}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["4"]}
      items={MenuItems}
    />
  )
}
