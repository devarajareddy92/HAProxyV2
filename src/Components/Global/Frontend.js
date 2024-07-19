import React, { useState, useEffect } from "react";
import { Checkbox, Divider, Tooltip } from "antd";
import { Input, Select, Button, Form } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const { Option } = Select;

const FrontendConfig = ({ jsonData1 }) => {
  const [selectedFrontend, setSelectedFrontend] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [compression, setCompression] = useState("Select Option");
  const [compressionAlgo, setCompressionAlgo] = useState("");
  const [compressionTypes, setCompressionTypes] = useState(new Set());
  const [frontendConfigurations, setFrontendConfigurations] = useState([
    {
      frontendName: "",
      defaultBackend: "Select",
      compression: "",
      compressionAlgo: "",
      mode: "",
      httpRedirect: "",
      compressionTypes: new Set(),
      binds: [
        { address: "", name: "", port: "", ssl_certificate: "", ssl: false },
      ], // Default bind field
    },
  ]);

  const [ServerIndexplus, setServerIndexplus] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddFrontend = () => {
    setFrontendConfigurations([
      ...frontendConfigurations,
      {
        frontendName: "",
        defaultBackend: "Select",
        compression: "",
        compressionAlgo: "",
        mode: "",
        httpRedirect: "",
        compressionTypes: new Set(),
        binds: [
          { address: "", name: "", port: "", ssl_certificate: "", ssl: false },
        ],
      },
    ]);
  };

  const handleDeleteFrontend = (index) => {
    const updatedFrontends = frontendConfigurations.filter(
      (_, i) => i !== index
    );
    setFrontendConfigurations(updatedFrontends);
  };

  const handleCompressionChange = (value, index) => {
    const updatedFrontends = [...frontendConfigurations];
    updatedFrontends[index].compression = value;
    if (value === "No") {
      updatedFrontends[index].compressionAlgo = "";
      updatedFrontends[index].compressionTypes = new Set();
    }
    setFrontendConfigurations(updatedFrontends);
  };

  const handleCompressionTypeChange = (type, checked, index) => {
    const updatedFrontends = [...frontendConfigurations];
    const newTypes = new Set(updatedFrontends[index].compressionTypes);
    if (checked) {
      newTypes.add(type);
    } else {
      newTypes.delete(type);
    }
    updatedFrontends[index].compressionTypes = newTypes;
    setFrontendConfigurations(updatedFrontends);
  };

  const handleCompressionAlgoChange = (value, index) => {
    const updatedFrontends = [...frontendConfigurations];
    updatedFrontends[index].compressionAlgo = value;
    setFrontendConfigurations(updatedFrontends);
  };

  const handleClickOnPlusButton = (frontendIndex) => {
    const updatedFrontends = [...frontendConfigurations];
    updatedFrontends[frontendIndex].binds.push({
      address: "",
      name: "",
      port: "",
      ssl_certificate: "",
      ssl: false,
    });
    setFrontendConfigurations(updatedFrontends);
  };

  const handleClickOnMinusOfButton = (frontendIndex, bindIndex) => {
    const updatedFrontends = [...frontendConfigurations];
    updatedFrontends[frontendIndex].binds = updatedFrontends[frontendIndex].binds.filter(
      (_, i) => i !== bindIndex
    );
    setFrontendConfigurations(updatedFrontends);
  };

  const handleFrontendChange = (index, field, value) => {
    const updatedFrontends = [...frontendConfigurations];
    updatedFrontends[index][field] = value;
    setFrontendConfigurations(updatedFrontends);
  };

  const handleBindChange = (frontendIndex, bindIndex, field, value) => {
    const updatedFrontends = [...frontendConfigurations];
    updatedFrontends[frontendIndex].binds[bindIndex][field] = value;
    setFrontendConfigurations(updatedFrontends);
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
      <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0 auto" }}>
        <div style={{ width: "100%" }}>
          {frontendConfigurations.map((frontend, index) => (
            <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #d9d9d9", borderRadius: "4px", backgroundColor: "#fff" }}>
              <Divider />
              <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
                Frontend {index + 1}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ flex: 1, padding: "0 10px" }}>
                  <label>Frontend Name:</label>
                  <Input
                    value={frontend.frontendName}
                    onChange={(e) => handleFrontendChange(index, "frontendName", e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ flex: 1, padding: "0 10px" }}>
                  <label>Default Backend:</label>
                  <Select
                    value={frontend.defaultBackend}
                    onChange={(value) => handleFrontendChange(index, "defaultBackend", value)}
                    style={{ width: "100%" }}
                  >
                    <Option value="Select">Select</Option>
                    {jsonData1 &&
                      jsonData1.map((optionData, idx) => (
                        <Option key={idx} value={optionData}>
                          {optionData}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>

              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ flex: 1, padding: "0 10px" }}>
                  <Tooltip title="Enables compression for responses sent to clients, reducing bandwidth usage. Note: Applicable only for HTTP">
                    <label>Compression:</label>
                  </Tooltip>
                  <Select
                    value={frontend.compression}
                    onChange={(value) => handleCompressionChange(value, index)}
                    style={{ width: "100%" }}
                  >
                    <Option value="Select Option">Select Option</Option>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
                {frontend.compression === "Yes" && (
                  <>
                    <div style={{ flex: 1, padding: "0 10px" }}>
                      <Tooltip title="Enables the specified compression algorithm for this bind.">
                        <label>Compression Algorithm:</label>
                      </Tooltip>
                      <Select
                        value={frontend.compressionAlgo}
                        onChange={(value) => handleCompressionAlgoChange(value, index)}
                        style={{ width: "100%" }}
                      >
                        <Option value="Select Option">Select Option</Option>
                        <Option value="gzip">gzip</Option>
                        <Option value="brotli">brotli</Option>
                        <Option value="zstd">zstd</Option>
                      </Select>
                    </div>
                    <div style={{ flex: 1, padding: "0 10px" }}>
                      <Tooltip title="Enables compression for the specified types.">
                        <label>Compression Types:</label>
                      </Tooltip>
                      <div>
                        <Checkbox
                          checked={frontend.compressionTypes.has("text/html")}
                          onChange={(e) => handleCompressionTypeChange("text/html", e.target.checked, index)}
                        >
                          text/html
                        </Checkbox>
                        <Checkbox
                          checked={frontend.compressionTypes.has("application/javascript")}
                          onChange={(e) => handleCompressionTypeChange("application/javascript", e.target.checked, index)}
                        >
                          application/javascript
                        </Checkbox>
                        <Checkbox
                          checked={frontend.compressionTypes.has("text/css")}
                          onChange={(e) => handleCompressionTypeChange("text/css", e.target.checked, index)}
                        >
                          text/css
                        </Checkbox>
                        <Checkbox
                          checked={frontend.compressionTypes.has("application/json")}
                          onChange={(e) => handleCompressionTypeChange("application/json", e.target.checked, index)}
                        >
                          application/json
                        </Checkbox>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Divider />

              <div>
                <label>Binds:</label>
                {frontend.binds.map((bind, bindIndex) => (
                  <div key={bindIndex} style={{ display: "flex", marginBottom: "10px" }}>
                    <div style={{ flex: 1, padding: "0 10px" }}>
                      <label>Address:</label>
                      <Input
                        value={bind.address}
                        onChange={(e) => handleBindChange(index, bindIndex, "address", e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1, padding: "0 10px" }}>
                      <label>Port:</label>
                      <Input
                        value={bind.port}
                        onChange={(e) => handleBindChange(index, bindIndex, "port", e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1, padding: "0 10px" }}>
                      <label>SSL Certificate:</label>
                      <Input
                        value={bind.ssl_certificate}
                        onChange={(e) => handleBindChange(index, bindIndex, "ssl_certificate", e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1, padding: "0 10px" }}>
                      <Checkbox
                        checked={bind.ssl}
                        onChange={(e) => handleBindChange(index, bindIndex, "ssl", e.target.checked)}
                      >
                        SSL
                      </Checkbox>
                    </div>
                    <div style={{ flex: "none", padding: "0 10px" }}>
                      <Button
                        type="danger"
                        icon={<MinusCircleFilled />}
                        onClick={() => handleClickOnMinusOfButton(index, bindIndex)}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  icon={<PlusCircleFilled />}
                  onClick={() => handleClickOnPlusButton(index)}
                >
                  Add Bind
                </Button>
              </div>

              <Divider />
              <Button type="danger" onClick={() => handleDeleteFrontend(index)}>
                Delete Frontend
              </Button>
            </div>
          ))}
          <Button type="primary" onClick={handleAddFrontend}>
            Add Frontend
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FrontendConfig;
