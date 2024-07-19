import React, { useState, useEffect } from "react";
import { Input, Select, Button, Form, Card, Row, Col, Tooltip } from "antd";
import {
  PlusCircleFilled,
  MinusCircleFilled,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const { Option } = Select;

const Backend = () => {
  const [newJsonData, setNewJsonData] = useState([
    {
      type: "new",
      server: [],
      data: { name: "", mode: "", balance: { algorithm: "" } },
    },
  ]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [backendIndexplus, setBackendIndexPlus] = useState(1);
  const [ServerIndexplus, setServerIndexplus] = useState(1);
  const [contactPersonDetailsIsOpen, setContactPersonDetailsIsOpen] =
    useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNameChange = (value, index) => {
    const updatedData = [...newJsonData];
    updatedData[index].data.name = value;
    setNewJsonData(updatedData);
  };

  const handleAlgorithmChange = (value, index) => {
    const updatedData = [...newJsonData];
    updatedData[index].data.balance.algorithm = value;
    setNewJsonData(updatedData);
  };

  const handleModeChange = (value, index) => {
    const updatedData = [...newJsonData];
    updatedData[index].data.mode = value;
    setNewJsonData(updatedData);
  };

  const removeBackend = (index) => {
    const updatedData = newJsonData.filter((_, i) => i !== index);
    setNewJsonData(updatedData);
  };

  const addBackend = () => {
    const newBackend = {
      type: "new",
      server: [],
      data: { name: "", mode: "", balance: { algorithm: "" } },
    };
    setNewJsonData([...newJsonData, newBackend]);
  };

  const handlePrimaryContactChange = (index, value) => {
    const updatedData = [...newJsonData];
    updatedData[index].data.check = value;
    setNewJsonData(updatedData);
  };

  const handleClickOnPlusButton = (index) => {
    setServerIndexplus(ServerIndexplus + 1);
  };

  const handleClickOnMinusOfButton = (backendIndex, serverIndex) => {
    setServerIndexplus(ServerIndexplus - 1);
  };

  const handleServerChange = (backendIndex, serverIndex, key, value) => {
    const updatedData = [...newJsonData];
    updatedData[backendIndex].server[serverIndex][key] = value;
    setNewJsonData(updatedData);
  };

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#dee2e6",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    buttonRow: {
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "1300px",
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    formItem: {
      display: "flex",
      flexDirection: "column",
      width: "48%",
    },
    labelSpan: {
      fontWeight: "500",
      display: "inline-block",
      textAlign: "left",
      fontSize: "12px",
    },
    input: {
      fontWeight: "500",
      textAlign: "left",
      fontSize: "12px",
      width: "100%",
      marginTop: "5px",
    },
    buttonItem: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
    button: {
      fontWeight: "500",
      fontSize: "12px",
    },
    card: {
      marginTop: "0.5cm",
      backgroundColor: "#f0f2f2",
      width: "100%",
    },
    table: {
      minWidth: 650,
      size: "smaller",
    },
    tableHeader: {
      padding: "0",
      height: "0.5cm",
    },
    tableCell: {
      padding: "0",
      height: "0.5cm",
    },
    formItemSmall: {
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <Form layout="vertical" style={styles.form}>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Backend
        </div>

        <Row justify="start" style={styles.buttonRow}>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={addBackend}
          >
            Add Backend
          </Button>
        </Row>
        {Array.from({ length: backendIndexplus }, (_, index) => (
          <div key={backendIndexplus}>
            <Row gutter={16} style={styles.row}>
              <Col span={8}>
                <Form.Item label="Backend Name" required>
                  <Input
                    placeholder="Enter the backend value"
                    onChange={(e) =>
                      handleNameChange(e.target.value, backendIndexplus)
                    }
                    required
                    style={styles.input}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    <Tooltip title="Specify the load-balancing algorithm for distributing traffic among backend servers">
                      Balance :
                    </Tooltip>
                  }
                  required
                >
                  <Select
                    placeholder="Select"
                    onChange={(value) =>
                      handleAlgorithmChange(value, backendIndexplus)
                    }
                    required
                    style={styles.input}
                  >
                    <Option value="roundrobin">roundrobin</Option>
                    <Option value="static-rr">static-rr</Option>
                    <Option value="leastconn">leastconn</Option>
                    <Option value="first">first</Option>
                    <Option value="source">source</Option>
                    <Option value="uri">uri</Option>
                    <Option value="url_param">url_param</Option>
                    <Option value="hdr">hdr</Option>
                    <Option value="random">random</Option>
                    <Option value="rdp-cookie">rdp-cookie</Option>
                    <Option value="hash">hash</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Mode" required>
                  <Select
                    placeholder="Select"
                    onChange={(value) =>
                      handleModeChange(value, backendIndexplus)
                    }
                    required
                    style={styles.input}
                  >
                    <Option value="TCP">TCP</Option>
                    <Option value="HTTP">HTTP</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col
                span={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="danger"
                  icon={<MinusCircleFilled />}
                  onClick={() => removeBackend(backendIndexplus)}
                />
              </Col>
            </Row>
            <Card style={styles.card}>
              <div
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() =>
                  setContactPersonDetailsIsOpen(!contactPersonDetailsIsOpen)
                }
              >
                <a
                  style={{
                    fontSize: "small",
                    fontWeight: "500",
                    color: "black",
                    marginLeft: "0.2cm",
                  }}
                >
                  {contactPersonDetailsIsOpen ? (
                    <UpOutlined
                      onClick={() => setContactPersonDetailsIsOpen(false)}
                    />
                  ) : (
                    <DownOutlined
                      onClick={() => setContactPersonDetailsIsOpen(true)}
                    />
                  )}{" "}
                  Server Details
                </a>
              </div>
              {contactPersonDetailsIsOpen && (
                <div>
                  <TableContainer>
                    <Table sx={styles.table} aria-label="a dense table">
                      <TableHead sx={styles.tableHeader}>
                        <TableRow sx={styles.tableHeader}>
                          <TableCell sx={styles.tableCell}>
                            <label
                              style={{
                                marginLeft: "0.2cm",
                                fontSize: "smaller",
                              }}
                            >
                              Server Name
                            </label>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            <label
                              style={{
                                marginLeft: "0.2cm",
                                fontSize: "smaller",
                              }}
                            >
                              IP/FQDN
                            </label>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            <label
                              style={{
                                marginLeft: "0.2cm",
                                fontSize: "smaller",
                              }}
                            >
                              Port Number
                            </label>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            <label
                              style={{
                                marginLeft: "0.2cm",
                                fontSize: "smaller",
                              }}
                            >
                              Check
                            </label>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            <label style={{ fontSize: "smaller" }}>
                              Add/Delete
                            </label>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.from({ length: ServerIndexplus }, (_, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                                marginTop: "0.5cm",
                              },
                              height: "1rem",
                            }}
                          >
                            <TableCell
                              sx={{
                                padding: "0",
                                borderBottom: "none",
                                width: "5cm",
                              }}
                            >
                              <Form.Item
                                name={`serverName_${index}`}
                                style={styles.formItemSmall}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input the Server Name",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Server Name"
                                  style={{
                                    width: "4cm",
                                    marginTop: "0.2cm",
                                    marginLeft: "0.1cm",
                                  }}
                                />
                              </Form.Item>
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "0",
                                borderBottom: "none",
                                width: "5cm",
                              }}
                            >
                              <Form.Item
                                name={`ipFQDN_${index}`}
                                style={styles.formItemSmall}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input the IP/FQDN",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="IP/FQDN"
                                  style={{
                                    width: "4cm",
                                    marginTop: "0.2cm",
                                    marginLeft: "0.1cm",
                                  }}
                                />
                              </Form.Item>
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "0",
                                borderBottom: "none",
                                width: "5cm",
                              }}
                            >
                              <Form.Item
                                name={`portNumber_${index}`}
                                style={styles.formItemSmall}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input the Port Number",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Port Number"
                                  style={{
                                    width: "4cm",
                                    marginTop: "0.2cm",
                                    marginLeft: "0.1cm",
                                  }}
                                />
                              </Form.Item>
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "0",
                                borderBottom: "none",
                                width: "5cm",
                              }}
                            >
                              <Form.Item
                                name={`check_${index}`}
                                style={styles.formItemSmall}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select an option",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select"
                                  style={{
                                    width: "4cm",
                                    marginTop: "0.2cm",
                                    marginLeft: "0.1cm",
                                  }}
                                  onChange={(value) =>
                                    handlePrimaryContactChange(index, value)
                                  }
                                >
                                  <Option value="enabled">Enabled</Option>
                                  <Option value="disabled">Disabled</Option>
                                </Select>
                              </Form.Item>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding: "0",
                                borderBottom: "none",
                                width: "5cm",
                              }}
                            >
                              <Form.Item style={styles.formItemSmall}>
                                <PlusCircleFilled
                                  onClick={() => handleClickOnPlusButton(index)}
                                  style={{ fontSize: "20px" }}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <MinusCircleFilled
                                  onClick={() =>
                                    handleClickOnMinusOfButton(index)
                                  }
                                  style={{ fontSize: "20px" }}
                                />
                              </Form.Item>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </Card>
          </div>
        ))}
      </Form>
    </div>
  );
};

export default Backend;
