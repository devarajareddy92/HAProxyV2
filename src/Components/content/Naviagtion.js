import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import {
  faBars,
  faTimes,
  faAlignLeft,
  faHome,
  faGlobe,
  faCog,
  faDatabase,
  faNetworkWired,
  faLock,
  faExchangeAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import classNames from "classnames";
// import 'antd/dist/antd.css';
import "../CssFolder/StyleCss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Global/GlobalContainer";
import GlobalContainer from "../Global/GlobalContainer";
import Default from "../Global/Default";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FrontendConfig from "../Global/Frontend";
import Stats from "../Global/Stats";
import Backend from "../Global/Backend";
import AclComponent from "../Global/AclComponent";
import SwitchingRulesComponent from "../Global/SwitchingRules";
import HomePage from "../Global/HomePage";
import CurrentConfigView from "../Global/CurrentConfigView";
import SubMenu from "antd/es/menu/SubMenu";
import JournalLogs from "../Global/JournalLogs";
import DeploymentHistory from "../Global/DeploymentHistory";

const Navigation = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Update the screen width whenever the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };
  console.log("innerwidth", screenWidth);
  console.log("the url is", window.location.href);

  const handleMenuClick = (action) => {
    setModalAction(action);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Perform the action here, e.g., call an API to restart/start/stop HA Proxy
    console.log(`Confirmed action: ${modalAction}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const optionsMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="#option1">Configure LB</a>
      </Menu.Item>
      <Menu.Item key="2">
        <Link as={Link} to="/current-config-view">
          Current Config-view
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/deploymenthistory">Deployment History</a>
      </Menu.Item>
      <SubMenu key="sub2" title="HA Proxy Actions">
        <Menu.Item
          key="4-1"
          onClick={() => handleMenuClick("Restart HA Proxy")}
        >
          <a href="#action1">Restart HA Proxy</a>
        </Menu.Item>
        <Menu.Item key="4-2" onClick={() => handleMenuClick("Start HA Proxy")}>
          <a href="#action2">Start HA Proxy</a>
        </Menu.Item>
        <Menu.Item key="4-3" onClick={() => handleMenuClick("Stop HA Proxy")}>
          <a href="#action3">Stop HA Proxy</a>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="5">
        <a href="journallogs">HA Proxy Journal Logs</a>
      </Menu.Item>
      <SubMenu key="sub1" title="Help">
        <Menu.Item key="6">
          <a href="#option6">About</a>
        </Menu.Item>
        <Menu.Item key="7">
          <a href="#option7">SOP</a>
        </Menu.Item>
        <Menu.Item key="8">
          <a href="#option8">FAQ</a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <div style={{ display: "flex" }}>
      <div className={classNames("sidebar", { "is-open": isSidebarOpen })}>
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h3>HAPROXY</h3>
          <Button
            type="link"
            onClick={toggleSidebar}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
        </div>

        <Nav className="flex-column pt-2">
          <Nav.Item>
            <Nav.Link href="/home">
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/global">
              <FontAwesomeIcon icon={faGlobe} className="mr-3" />
              Global
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/default">
              <FontAwesomeIcon icon={faCog} className="mr-3" />
              Default
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/backend">
              <FontAwesomeIcon icon={faDatabase} className="mr-3" />
              Backend
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/frontend">
              <FontAwesomeIcon icon={faNetworkWired} className="mr-3" />
              Frontend
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/acl">
              <FontAwesomeIcon icon={faLock} className="mr-3" />
              ACL
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/switchingrules">
              <FontAwesomeIcon icon={faExchangeAlt} className="mr-3" />
              Switching Rules
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/stats">
              <FontAwesomeIcon icon={faChartLine} className="mr-3" />
              Stats
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <div className="content">
        <nav className="navbar">
          <Button type="primary" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </Button>
          <div className="navbar-logo" style={{ paddingLeft: "20px" }}>
            HAPROXY CONFIG MANAGER
          </div>
          <div className={`navbar-links ${isNavbarOpen ? "active" : ""}`}>
            <a href="/home">Home</a>
            <Dropdown overlay={optionsMenu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Options <FontAwesomeIcon icon={faBars} />
              </a>
            </Dropdown>
            <a href="#status">Status</a>
            <a style={{ paddingRight: "40px" }} href="">
              Logout
            </a>
          </div>
          <div className="navbar-toggle" onClick={toggleNavbar}>
            <FontAwesomeIcon
              icon={isNavbarOpen ? faTimes : faBars}
              className="navbar-toggle-icon"
            />
          </div>
        </nav>

        <div className={`content ${isSidebarOpen ? "content-shift" : ""}`}>
          {window.location.href.includes("global") ? (
            <GlobalContainer />
          )
          : window.location.href.includes("/home") ? (
            <HomePage />
          )
           : window.location.href.includes("frontend") ? (
            <FrontendConfig />
          ) : window.location.href.includes("default") ? (
            <Default />
          ) : window.location.href.includes("stats") ? (
            <Stats />
          ) : window.location.href.includes("backend") ? (
            <Backend />
          ) : window.location.href.includes("acl") ? (
            <AclComponent />
          ) : window.location.href.includes("switchingrules") ? (
            <SwitchingRulesComponent />
          ) : window.location.href.includes("current-config-view") ? (
            <CurrentConfigView />
          ) : window.location.href.includes("journallogs") ? (
            <JournalLogs />
          ) : window.location.href.includes("deploymenthistory") ? (
            <DeploymentHistory/>
          ) : null}
        </div>
      </div>

      <Modal
        title="Confirm Action"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Okay"
        cancelText="Cancel"
      >
        <p>Are you sure you want to {modalAction}?</p>
      </Modal>
    </div>
  );
};

export default Navigation;
