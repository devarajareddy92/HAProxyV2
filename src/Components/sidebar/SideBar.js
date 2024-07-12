import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faGlobe,
    faCog,
    faDatabase,
    faNetworkWired,
    faLock,
    faExchangeAlt,
    faChartLine,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import './Sidebar.css';

const SideBar = () => {   //{ isOpen, toggle }
    return (
        <div className={classNames("sidebar", { "is-open": true })}> 
            <div className="sidebar-header d-flex justify-content-between align-items-center">
                <h3>HAPROXY</h3>
                <Button
                    variant="link"
                    // onClick={toggle}
                    style={{ color: "#fff" }}
                    className="mt-4"
                >
                    <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
                </Button>
            </div>

            <Nav className="flex-column pt-2">
                {/* <p className="ml-3">Heading</p> */}

                <Nav.Item className="">
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faHome} className="mr-3" />
                        Home
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faGlobe} className="mr-3" />
                        Global
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faCog} className="mr-3" />
                        Default
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faDatabase} className="mr-3" />
                        Backend
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faNetworkWired} className="mr-3" />
                        Frontend
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faLock} className="mr-3" />
                        ACL
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faExchangeAlt} className="mr-3" />
                        Switching Rules
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/">
                        <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                        Stats
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default SideBar;
