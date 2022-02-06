import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppRouter from "./app-router";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./style.css";

const { Header, Sider, Content } = Layout;

interface CPMprops {
  match: any;
}
interface CMPstate {
  collapsed: boolean;
}
class App extends React.Component<CPMprops, CMPstate> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { url } = this.props.match;

    return (
      <Layout>
        <Sider
          style={{
            height: "100vh",
          }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<QuestionCircleOutlined />}>
              <Link to="/home">แจ้งปัญหา</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/home/customer">รายชื่อลูกค้า</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <AppRouter url={url} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(App);
