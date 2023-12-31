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

export const MenuItems: MenuProps["items"] = [
  {
    key: "/admin",
    label: <Link href="/">首页</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "/admin/rte",
    label: <Link href="/rte">富文本编辑器</Link>,
    icon: <DatabaseOutlined />,
  },
  {
    key: "/admin/data",
    label: <Link href="/data">数据管理</Link>,
    icon: <DatabaseOutlined />,
  },
  {
    key: "/admin/program",
    label: <Link href="/program">计算模块</Link>,
    icon: <CalculatorOutlined />,
  },
  {
    key: "/admin/model",
    label: <Link href="/model">仿真模型</Link>,
    icon: <DotChartOutlined />,
  },
  {
    key: "/admin/workflow",
    label: <Link href="/workflow">业务流程</Link>,
    icon: <BranchesOutlined />,
  },
  {
    key: "/admin/experiment",
    label: <Link href="/experiment">实验管理</Link>,
    icon: <ExperimentOutlined />,
  },
]

export default function MainMenu() {
  const path = usePathname()
  const router = useRouter()
  return (
    <Menu
      style={{
        borderInlineEnd: "none",
      }}
      selectedKeys={[path]}
      onClick={(e) => {
        router.push(e.key)
      }}
      mode="inline"
      defaultSelectedKeys={["4"]}
      items={MenuItems}
    />
  )
}
