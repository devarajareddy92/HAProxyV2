import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import {
  PlusCircleFilled,
  MinusCircleFilled,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const { Option } = Select;

const AclComponent = () => {
  const [newJsonData, setNewJsonData] = useState({
    frontend_name: "",
    acl_name: "",
    criterion: "",
    value: "",
    index: 0,
  });

  const [frontendName, setFrontendName] = useState("");
  const [aclData, setAclData] = useState([]);
  const [index, setIndex] = useState(0);
  const [aclplusbutton, setAclPlusButton] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddAcl = () => {
    const newAcl = {
      frontend_name: "",
      acl_name: "",
      criterion: "",
      value: "",
      index: index,
    };
    setNewJsonData([...newJsonData, newAcl]);
  };

  const handleAddAclPlusbutton = () => {
    const newAcl = {
      frontend_name: "",
      acl_name: "",
      criterion: "",
      value: "",
      index: index,
    };
    setAclData([...aclData, newAcl]);
    setIndex(index + 1);
    setFrontendName("");
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = aclData.map((acl) =>
      acl.index === index ? { ...acl, [field]: value } : acl
    );
    setAclData(updatedData);
  };

  const handleClickOnPlusButton = (index) => {
    setAclPlusButton(aclplusbutton + 1);
  };

  const handleClickOnMinusOfButton = (index) => {
    setAclPlusButton(aclplusbutton - 1);
  };

  const handleRemoveAcl = (index) => {
    const updatedData = aclData.filter((acl) => acl.index !== index);
    setAclData(updatedData);
    message.success("ACL deleted successfully");
  };

  const handleNameChange = (value, index) => {
    const updatedData = [...newJsonData];
    updatedData[index].data.name = value;
    setNewJsonData(updatedData);
  };

  // Styles
  const containerStyle = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#dee2e6",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1300px",
    backgroundColor: "#fff",
    padding: "40px",
  };

  const formItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "20px",
  };

  const headerStyle = {
    position: "relative",
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const buttonGroupStyle = {
    textAlign: "left",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <Form layout="vertical" style={formStyle}>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ACL
        </div>

        <Row justify="start" style={{ marginBottom: "20px" }}>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={handleAddAcl}
          >
            Add ACL
          </Button>
        </Row>

        <div key={index}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <Form.Item label="Frontend Name" required>
                <Input placeholder="Enter the Frontend value" required />
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
                onClick={() => handleRemoveAcl(index)}
              />
            </Col>
          </Row>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ padding: "0", height: "0.5cm" }}>
                <TableRow sx={{ padding: "0", height: "0.5cm" }}>
                  <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                      ACL Name
                    </label>
                  </TableCell>
                  <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                      Criterion
                    </label>
                  </TableCell>
                  <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                      Index
                    </label>
                  </TableCell>
                  <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                      Value
                    </label>
                  </TableCell>
                  <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                    <label style={{ fontSize: "smaller" }}>Add/Delete</label>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: aclplusbutton }, (_, index) => (
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
                      sx={{ padding: "0", borderBottom: "none", width: "5cm" }}
                    >
                      <Form.Item
                        name={`aclName_${index}`}
                        style={{ marginBottom: "5px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input the ACL Name",
                          },
                        ]}
                      >
                        <Input
                          placeholder="ACL Name"
                          style={{
                            width: "4cm",
                            marginTop: "0.2cm",
                            marginLeft: "0.1cm",
                          }}
                        />
                      </Form.Item>
                    </TableCell>
                    <TableCell
                      sx={{ padding: "0", borderBottom: "none", width: "5cm" }}
                    >
                      <Form.Item
                        name={`criterion${index}`}
                        style={{ marginBottom: "5px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input the Criterion",
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
                          required
                        >
                          <Option value="src">Source</Option>
                          <Option value="dst_port">Destination-port</Option>
                          <Option value="hdr(host)">Host</Option>
                          <Option value="req_ssl_ver">SSL Version</Option>
                          <Option value="path_beg">Path begin with</Option>
                          <Option value="path_end">Path ends with</Option>
                          <Option value="hdr_beg(host)">Host begin with</Option>
                          <Option value="hdr_end(host)">Host ends with</Option>
                          <Option value="method">Method</Option>
                          <Option value="status">Status</Option>
                        </Select>
                      </Form.Item>
                    </TableCell>
                    <TableCell
                      sx={{ padding: "0", borderBottom: "none", width: "5cm" }}
                    >
                      <Form.Item
                        name={`index${index}`}
                        style={{ marginBottom: "5px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input the Port Number",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Index Number"
                          type="number"
                          style={{
                            width: "4cm",
                            marginTop: "0.2cm",
                            marginLeft: "0.1cm",
                          }}
                        />
                      </Form.Item>
                    </TableCell>
                    <TableCell
                      sx={{ padding: "0", borderBottom: "none", width: "5cm" }}
                    >
                      <Form.Item
                        name={`value${index}`}
                        style={{ marginBottom: "5px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please select an option",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Value Number"
                          type="number"
                          style={{
                            width: "4cm",
                            marginTop: "0.2cm",
                            marginLeft: "0.1cm",
                          }}
                        />
                      </Form.Item>
                    </TableCell>
                    <TableCell
                      sx={{ padding: "0", borderBottom: "none", width: "5cm" }}
                    >
                      <Form.Item style={{ marginBottom: "5px" }}>
                        <PlusCircleOutlined
                          onClick={() => handleClickOnPlusButton(index)}
                          style={{ fontSize: "20px" }}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <MinusCircleOutlined
                          onClick={() => handleClickOnMinusOfButton(index)}
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
      </Form>
    </div>
  );
};

export default AclComponent;
