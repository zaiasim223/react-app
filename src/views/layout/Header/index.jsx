import React from "react";
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, Modal, Layout, Avatar } from "antd";
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import "./index.less";
const { Header } = Layout;

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo,
    showSettings,
    fixedHeader,
  } = props;
  token && getUserInfo(token);
  const handleLogout = (token) => {
    Modal.confirm({
      title: "log out",
      content: "Are you sure you want to sign out of the system?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        logout(token);
      },
      
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Sign out</Menu.Item>
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };
  return (
    <>
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <FullScreen />
          {showSettings ? <Settings /> : null}
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="medium" src={avatar} />
                <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader);
