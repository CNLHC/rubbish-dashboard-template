import { Breadcrumb } from "antd"
import { SubMenuType } from "antd/es/menu/hooks/useItems"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { MenuItems } from "./main-menu"
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"

const menuItems = MenuItems as Array<SubMenuType>
const indexMenu = menuItems.find((item) => item.key === "/")!

export function buildBreadcrumb(pathname: string): Array<BreadcrumbItemType> {
  const res: Array<BreadcrumbItemType> = []

  const ingredients = pathname.split("/")
  let current = menuItems
  let currentPath = ""
  for (const route of ingredients) {
    if (route == "") {
      res.push({ title: indexMenu.label })
      continue
    }
    currentPath += `/${route}`
    const entry = current.find((item) => item.key === currentPath)
    if (!entry) {
      continue
    }
    res.push({ title: entry.label })
    current = (entry.children ?? []) as Array<SubMenuType>
  }
  return res
}

const MainBreadcrumb = () => {
  const pathname = usePathname()
  const items = useMemo(() => buildBreadcrumb(pathname), [pathname])

  if (pathname === "/") return null
  return <Breadcrumb items={items}></Breadcrumb>
}

export default MainBreadcrumb
