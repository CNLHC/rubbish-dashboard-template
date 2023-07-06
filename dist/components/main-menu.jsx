"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var link_1 = __importDefault(require("next/link"));
var navigation_1 = require("next/navigation");
var MenuItems = [
    {
        key: "/",
        label: <link_1.default href="/">首页</link_1.default>,
        icon: <icons_1.DashboardOutlined />,
    },
    {
        key: "/data",
        label: <link_1.default href="/data">数据管理</link_1.default>,
        icon: <icons_1.DatabaseOutlined />,
    },
    {
        key: "/program",
        label: <link_1.default href="/program">计算模块</link_1.default>,
        icon: <icons_1.CalculatorOutlined />,
    },
    {
        key: "/model",
        label: <link_1.default href="/model">仿真模型</link_1.default>,
        icon: <icons_1.DotChartOutlined />,
    },
    {
        key: "/workflow",
        label: <link_1.default href="/workflow">业务流程</link_1.default>,
        icon: <icons_1.BranchesOutlined />,
    },
    {
        key: "/experiment",
        label: <link_1.default href="/experiment">实验管理</link_1.default>,
        icon: <icons_1.ExperimentOutlined />,
    },
];
function MainMenu() {
    var path = (0, navigation_1.usePathname)();
    var router = (0, navigation_1.useRouter)();
    return (<antd_1.Menu selectedKeys={[path]} onClick={function (e) {
            router.push(e.key);
        }} theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={MenuItems}/>);
}
exports.default = MainMenu;
