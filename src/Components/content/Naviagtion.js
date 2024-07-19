import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from 'react-bootstrap';
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
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import classNames from 'classnames';
// import 'antd/dist/antd.css';
import '../CssFolder/StyleCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Global/GlobalContainer'
import GlobalContainer from '../Global/GlobalContainer';
import Default from '../Global/Default';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FrontendConfig from '../Global/Frontend';
import Stats from '../Global/Stats';
import Backend from '../Global/Backend';
import AclComponent from '../Global/AclComponent';
import SwitchingRulesComponent from '../Global/SwitchingRules';
import HomePage from '../Global/HomePage';
import { useLocation, useNavigate } from 'react-router-dom';

const Naviagtion = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Update the screen width whenever the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  var protokenforall;

  try {
    protokenforall = location.state.proToken
    console.log("protokenforall", protokenforall)
  } catch (exception) {
    navigate("/")
  }
  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };
  console.log("innerwidth", screenWidth);
  console.log("the url is", window.location.href)

  const sideclickaction = (flag) => {

    if (flag === "home") {
      navigate("/home", { state: { proToken: protokenforall } });
    }
    else if (flag === "global") {
      navigate("/global", { state: { proToken: protokenforall } });
    }
    else if (flag === "default") {
      navigate("/default", { state: { proToken: protokenforall } });
    }
    else if (flag === "backend") {
      navigate("/backend", { state: { proToken: protokenforall } });
    }
    else if (flag === "frontend") {
      navigate("/frontend", { state: { proToken: protokenforall } });
    }
    else if (flag === "acl") {
      navigate("/acl", { state: { proToken: protokenforall } });
    }
    else if (flag === "switchingrules") {
      navigate("/switchingrules", { state: { proToken: protokenforall } });
    }
    else if (flag === "stats") {
      navigate("/stats", { state: { proToken: protokenforall } });
    }
  }
  return (

    <div style={{ display: "flex" }}>
      <div className={classNames('sidebar', { 'is-open': isSidebarOpen })}>
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h3>HAPROXY</h3>
          <Button
            type="link"
            onClick={toggleSidebar}
            style={{ color: '#fff' }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
        </div>

        <Nav className="flex-column pt-2">
          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("home")}>
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("global")}>
              <FontAwesomeIcon icon={faGlobe} className="mr-3" />
              Global
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("default")}>
              <FontAwesomeIcon icon={faCog} className="mr-3" />
              Default
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("backend")}>
              <FontAwesomeIcon icon={faDatabase} className="mr-3" />
              Backend
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("frontend")}>
              <FontAwesomeIcon icon={faNetworkWired} className="mr-3" />
              Frontend
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("acl")}>
              <FontAwesomeIcon icon={faLock} className="mr-3" />
              ACL
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("switchingrules")}>
              <FontAwesomeIcon icon={faExchangeAlt} className="mr-3" />
              Switching Rules
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={() => sideclickaction("stats")}>
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
          <div className="navbar-logo" style={{ paddingLeft: '20px' }}>HAPROXY CONFIG MANAGER</div>
          <div className={`navbar-links ${isNavbarOpen ? 'active' : ''}`}>
            <a href="/home">Home</a>
            <a href="#status">Status</a>
            <a style={{ paddingRight: "40px" }} href="/">Logout</a>
          </div>
          <div className="navbar-toggle" onClick={toggleNavbar}>
            <FontAwesomeIcon icon={isNavbarOpen ? faTimes : faBars} className="navbar-toggle-icon" />
          </div>
        </nav>

        <div className={`content ${isSidebarOpen ? 'content-shift' : ''}`}>

          {window.location.href.includes("global") ?
            <GlobalContainer protoken={protokenforall} />
            : window.location.href.includes("frontend") ?
              <FrontendConfig protoken={protokenforall} />
              : window.location.href.includes("default") ?
                < Default protoken={protokenforall} />
                :
                window.location.href.includes("stats") ?
                  <Stats protoken={protokenforall} />
                  : window.location.href.includes("backend") ?
                    <Backend protoken={protokenforall} />
                    : window.location.href.includes("acl") ?
                      <AclComponent protoken={protokenforall} />
                      : window.location.href.includes("switchingrules") ?
                        <SwitchingRulesComponent protoken={protokenforall} />
                        : window.location.href.includes("/home") ?
                          <HomePage protoken={protokenforall} />

                          : null
          }

        </div>
      </div>
    </div>

  );
};


export default Naviagtion;
