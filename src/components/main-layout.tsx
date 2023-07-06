import { Layout, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content, Footer } from "antd/es/layout/layout"
import React from "react"
import MainBreadcrumb from "./main-breadcrumb"
import MainHeader from "./main-header"
import MainMenu from "./main-menu"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <p className="text-white font-sans font-bold text-xl mx-auto text-center">
            Parallel Systems
          </p>
        </div>
        <MainMenu />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <MainHeader />
        <div className="mx-4 my-4">
          <MainBreadcrumb />
          <Content>
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
        </div>
        <Footer style={{ textAlign: "center" }}>
          ©2023 Created by Seekthought
        </Footer>
      </Layout>
    </Layout>
  )
}
