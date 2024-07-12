import React, { useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const SubMenu = ({ icon, title, items }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Nav.Item className={classNames({ open: !collapsed })}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header as={Nav.Link} onClick={toggleNavbar}>
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {title}
            <FontAwesomeIcon
              icon={collapsed ? faCaretDown : faCaretUp}
              className="float-right"
            />
          </Accordion.Header>
          <Accordion.Body>
            <nav className="nav flex-column">
              {items.map((item) => (
                <a
                  className={`nav-link nav-item pl-5 ${
                    item === "Active" ? "active" : ""
                  }`}
                  href="/"
                  key={item}
                >
                  {item}
                </a>
              ))}
            </nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav.Item>
  );
};

export default SubMenu;
