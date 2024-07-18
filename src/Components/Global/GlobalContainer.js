import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Tooltip, Row, Col } from "antd";
import "../CssFolder/StyleCss.css";

const { Option } = Select;

const GlobalContainer = () => {
  const [newJsonData, setNewJsonData] = useState({});
  const [tlsSecurity, setTlsSecurity] = useState("");
  const [showMaxMinVersions, setShowMaxMinVersions] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    alert("Form submitted");
  };

  const handleSave = () => {
    alert("Data Saved");
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

  const handleTlsSecurityChange = (value) => {
    setTlsSecurity(value);
    if (value === "Allow") {
      setShowMaxMinVersions(true);
    } else {
      setShowMaxMinVersions(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#dee2e6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Global Section
          </div>
          <Form
            onFinish={handleSubmit}
            initialValues={newJsonData}
            layout="vertical"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <Form.Item
              name="maxconn"
              label={
                <Tooltip title="The maximum allowed concurrent connections for this server. Once reached, additional connection attempts may be rejected or queued, depending on configuration.">
                  Max Connection
                </Tooltip>
              }
              style={{ marginBottom: "20px" }}
            >
              <Input
                style={{
                  fontWeight: "500",
                  textAlign: "left",
                  fontSize: "12px",
                  width: "100%",
                  maxWidth: screenWidth > 1000 ? "400px" : "300px",
                }}
                type="number"
                placeholder="Enter Max-conn number"
              />
            </Form.Item>

            <Form.Item
              name="tlsSecurity"
              label="TLS Security:"
              style={{ marginBottom: "20px" }}
            >
              <Select
                style={{
                  fontWeight: "500",
                  textAlign: "left",
                  fontSize: "12px",
                  width: "100%",
                  maxWidth: screenWidth > 1000 ? "400px" : "300px",
                }}
                placeholder="Select TLS Security"
                onChange={handleTlsSecurityChange}
              >
                <Option value="No Action">No Action</Option>
                <Option value="Allow">Allow</Option>
                <Option value="Block">Block</Option>
              </Select>
            </Form.Item>

            {showMaxMinVersions && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="maxVersion"
                    label="Max Version:"
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "300px",
                    }}
                  >
                    <Select
                      style={{
                        fontWeight: "500",
                        textAlign: "left",
                        fontSize: "12px",
                        width: "100%",
                      }}
                      placeholder="Select Max Version"
                    >
                      <Option value="SSLv3">SSLv3</Option>
                      <Option value="TLSv1.0">TLSv1.0</Option>
                      <Option value="TLSv1.1">TLSv1.1</Option>
                      <Option value="TLSv1.2">TLSv1.2</Option>
                      <Option value="TLSv1.3">TLSv1.3</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="minVersion"
                    label="Min Version:"
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "300px",
                    }}
                  >
                    <Select
                      style={{
                        fontWeight: "500",
                        textAlign: "left",
                        fontSize: "12px",
                        width: "100%",
                      }}
                      placeholder="Select Min Version"
                    >
                      <Option value="SSLv3">SSLv3</Option>
                      <Option value="TLSv1.0">TLSv1.0</Option>
                      <Option value="TLSv1.1">TLSv1.1</Option>
                      <Option value="TLSv1.2">TLSv1.2</Option>
                      <Option value="TLSv1.3">TLSv1.3</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="ciphers"
                  label="Cipher:"
                  style={{
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "300px",
                  }}
                >
                  <Input
                    style={{
                      fontWeight: "500",
                      textAlign: "left",
                      fontSize: "12px",
                      width: "100%",
                    }}
                    placeholder="Enter ciphers"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ipAddress"
                  label="IP Address/Port:"
                  style={{
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "300px",
                  }}
                >
                  <Input
                    style={{
                      fontWeight: "500",
                      textAlign: "left",
                      fontSize: "12px",
                      width: "100%",
                    }}
                    placeholder="Enter IP Address/Port"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginTop: "20px" }}>
              <Button type="primary" htmlType="submit">
                Final Submit
              </Button>
              <Button
                type="default"
                onClick={handleSave}
                style={{ marginLeft: "10px" }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GlobalContainer;
