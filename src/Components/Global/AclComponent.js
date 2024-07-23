import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import IpAddress from "../../IPConfig";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const AclComponent = () => {
  const [aclData, setAclData] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [jsonData, setJsonData] = useState({});
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const IP = IpAddress();
  const localStorageKey = localStorage.getItem("proToken");

  const [frontendOptions, setFrontendOptions] = useState([]);
  const [resultAcl, setResultAcl] = useState([]);
  const [dialogState, setDialogState] = useState(false);

  const [aclName, setAclName] = useState("");
  const [aclCrit, setAclCrit] = useState("");
  const [aclIndex, setAclIndex] = useState("");
  const [aclValue, setAclValue] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoadingFlag(true);
    fetch(IP + "acl_lines", {
      headers: {
        Authorization: localStorageKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.data.map((val) => {
          setFrontendOptions((prev) => [
            ...prev,
            { value: val.frontend, label: val.frontend },
          ]);
        });
        setAclData(data.data);
        setResultAcl(data.data);
        if (data.error === 0) {
          setJsonData(data);
          // Ensure this matches your data structure
          setLoadingFlag(false);
        } else if (data.error === 1) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingFlag(false);
      });
  }, [IP, localStorageKey, navigate]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setLoadingFlag(true);
        console.log("Saved values:", values);

        axios
          .post(IP + "save_acl_rule", values, {
            headers: {
              Authorization: localStorageKey,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("Save response:", response);
            setLoadingFlag(false);
            if (response.status === 200 && response.data.error === 0) {
              message.success("Saved successfully!");
            } else {
              message.error("Save failed: " + response.data.msg);
            }
          })
          .catch((error) => {
            console.error("Save error:", error);
            setLoadingFlag(false);
            message.error("An error occurred while saving.");
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleAddAcl = () => {
    axios
      .post(
        IP + "save_acl_rule",
        {
          acl_name: aclName,
          criterion: aclCrit,
          index: aclIndex,
          value: aclValue,
        },
        {
          headers: {
            Authorization: localStorageKey,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => alert(error.message));
  };

  const handleRemoveAcl = (index) => {
    setAclData(aclData.filter((acl) => acl.index !== index));
    message.success("ACL deleted successfully");
  };

  const handleInputChange = (index, field, value) => {
    setAclData(
      aclData.map((acl) =>
        acl.index === index ? { ...acl, [field]: value } : acl
      )
    );
  };

  const handleFrontEndSelect = (frontend) => {
    setResultAcl(aclData.filter((val) => val.frontend == frontend));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#dee2e6",
      }}
    >
      <Form
        layout="vertical"
        form={form}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1300px",
          backgroundColor: "#fff",
          padding: "40px",
        }}
      >
        <div
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}
        >
          ACL
        </div>
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Form.Item label="Frontend Name" required>
              <Select
                onChange={(value) => {
                  handleInputChange(0, "frontend_name", value);
                  handleFrontEndSelect(value);
                }}
                style={{ width: "100%" }}
                placeholder="Select frontend"
                options={frontendOptions}
              >
                {/* {jsonData.data &&
                  jsonData.data.map((optionData, idx) => (
                    <Option key={idx} value={optionData.frontend}>
                      {optionData.frontend}
                    </Option>
                  ))} */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ACL Name</TableCell>
                <TableCell>Criterion</TableCell>
                <TableCell>Index</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Add/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultAcl.map((acl) => (
                <>
                  {acl.acl.data.map((val) => (
                    <TableRow key={val.index}>
                      <TableCell>
                        {val.acl_name ?? ""}
                        {/* <Form.Item
                      name={`aclName_${acl.acl.data[0].acl_name}`}
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
                        value={acl.acl_name}
                        onChange={(e) =>
                          handleInputChange(
                            acl.index,
                            "acl_name",
                            e.target.value
                          )
                        }
                      />
                    </Form.Item> */}
                      </TableCell>
                      <TableCell>
                        {val.criterion ?? ""}
                        {/* <Form.Item
                      name={`criterion_${acl.index}`}
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
                        value={acl.criterion}
                        onChange={(value) =>
                          handleInputChange(acl.index, "criterion", value)
                        }
                      >
                      </Select>
                    </Form.Item> */}
                      </TableCell>
                      <TableCell>
                        {val.index ?? ""}
                        {/* <Form.Item
                      name={`index_${acl.index}`}
                      style={{ marginBottom: "5px" }}
                      rules={[
                        {
                          required: true,
                          message: "Please input the Index Number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Index Number"
                        type="number"
                        value={acl.index}
                        onChange={(e) =>
                          handleInputChange(acl.index, "index", e.target.value)
                        }
                      />
                    </Form.Item> */}
                      </TableCell>
                      <TableCell>
                        {val.value ?? ""}
                        {/* <Form.Item
                      name={`value_${acl.index}`}
                      style={{ marginBottom: "5px" }}
                      rules={[
                        { required: true, message: "Please input the Value" },
                      ]}
                    >
                      <Input
                        placeholder="Value Number"
                        type="number"
                        value={acl.value}
                        onChange={(e) =>
                          handleInputChange(acl.index, "value", e.target.value)
                        }
                      />
                    </Form.Item> */}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="text"
                          icon={<PlusCircleOutlined />}
                          onClick={() => setDialogState(!dialogState)}
                        />
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => handleRemoveAcl(acl.index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ marginTop: "20px" }}>
          <Button type="primary" onClick={handleSave} loading={loadingFlag}>
            Save
          </Button>
        </div>
      </Form>

      <Dialog onClose={() => setDialogState(!dialogState)} open={dialogState}>
        <DialogTitle>Create Acl</DialogTitle>

        <div>
          <TextField
            onChange={(e) => setAclName(e.target.value)}
            placeholder="Acl name"
          />
          <TextField
            onChange={(e) => setAclCrit(e.target.value)}
            placeholder="Acl criterion"
          />
          <TextField
            onChange={(e) => setAclIndex(e.target.value)}
            placeholder="Acl index"
          />
          <TextField
            onChange={(e) => setAclValue(e.target.value)}
            placeholder="Acl value"
          />
          <Button onClick={handleAddAcl}>Save</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AclComponent;
