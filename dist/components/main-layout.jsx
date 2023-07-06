"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var Sider_1 = __importDefault(require("antd/es/layout/Sider"));
var layout_1 = require("antd/es/layout/layout");
var react_1 = __importDefault(require("react"));
var main_menu_1 = __importDefault(require("./main-menu"));
function MainLayout(_a) {
    var children = _a.children;
    var colorBgContainer = antd_1.theme.useToken().token.colorBgContainer;
    return (<antd_1.Layout hasSider>
      <Sider_1.default style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
        }}>
        <div className="demo-logo-vertical">
          <span className="">Parallel Systems</span>
        </div>
        <main_menu_1.default />
      </Sider_1.default>
      <antd_1.Layout className="site-layout" style={{ marginLeft: 200 }}>
        <layout_1.Header style={{ padding: 0, background: colorBgContainer }}/>
        <layout_1.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
        }}>
            {children}
          </div>
        </layout_1.Content>
        <layout_1.Footer style={{ textAlign: "center" }}>
          ©2023 Created by Seekthought
        </layout_1.Footer>
      </antd_1.Layout>
    </antd_1.Layout>);
}
exports.default = MainLayout;
