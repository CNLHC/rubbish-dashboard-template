import { Layout, theme } from "antd"
import React, { useState } from "react"
import MainBreadcrumb from "./main-breadcrumb"
import MainHeader from "./main-header"
import MainMenu from "./main-menu"
import classNames from "classnames"

const { Header, Content, Footer, Sider } = Layout

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="text-center h-12 items-center text-black flex dark:text-white ">
          <div
            className={classNames("w-full", collapsed ? "text-sm" : "text-xl")}
          >
            Demo
          </div>
        </div>
        <MainMenu />
      </Sider>
      <Layout className="site-layout">
        <MainHeader />
        <Content className="mx-4 my-4 min-h-[calc(100vh_-_48px_-_64px_-_32px)]">
          <MainBreadcrumb />
          <div
            className="p-4 rounded-md"
            style={{
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }} className="py-5">
          <span className="text-sm leading-6">
            ©2023 Created by Seekthought
          </span>
        </Footer>
      </Layout>
    </Layout>
  )
}
