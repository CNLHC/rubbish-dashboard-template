import { theme } from "antd";
import { Header } from "antd/es/layout/layout";

const MainHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer, height: "48px" }}
    />
  );
};

export default MainHeader;
