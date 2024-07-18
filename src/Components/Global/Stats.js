import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Divider } from "antd";

const { Option } = Select;

const Stats = () => {
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

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#dee2e6",
    },
    header: {
      position: "relative",
      marginBottom: "20px",
      fontSize: "18px",
      fontWeight: "bold",
    },
    label: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    select: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    link: {
      marginLeft: "10px",
      color: "#1890ff",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "1300px",
      backgroundColor: "#fff",
      padding: "20px",
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
    required: {
      color: "red",
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
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
        <div style={{ width: "100%" }}>
          <div
            style={{
              marginBottom: "20px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "#fff",
              textAlign: "left",
              padding: "40px",
            }}
          >
            <h1> Stats Action</h1>
            <br />
            <label style={styles.label}>
              Stats Action
              <select name="YESorNO" id="pref" style={styles.select}>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
              <a href="" style={styles.link}>
                Go to Dashboard
              </a>
            </label>
            <Form layout="horizontal" style={styles.form}>
              <div style={styles.row}>
                <Form.Item
                  label={
                    <span style={styles.labelSpan}>
                      Bind Address <span style={styles.required}>*</span>
                    </span>
                  }
                  style={styles.formItem}
                >
                  <Input
                    placeholder="Enter Bind Address"
                    style={styles.input}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span style={styles.labelSpan}>
                      Bind Port <span style={styles.required}>*</span>
                    </span>
                  }
                  style={styles.formItem}
                >
                  <Input placeholder="Enter Bind Port" style={styles.input} />
                </Form.Item>
              </div>
              <div style={styles.row}>
                <Form.Item
                  label={
                    <span style={styles.labelSpan}>
                      Refresh Rate <span style={styles.required}>*</span>
                    </span>
                  }
                  style={styles.formItem}
                >
                  <Input
                    placeholder="Enter Refresh Rate"
                    style={styles.input}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span style={styles.labelSpan}>
                      URL <span style={styles.required}>*</span>
                    </span>
                  }
                  style={styles.formItem}
                >
                  <Input placeholder="Enter URL" style={styles.input} />
                </Form.Item>
              </div>
              <div style={styles.row}>
                <Form.Item
                  label={
                    <span style={styles.labelSpan}>
                      Username <span style={styles.required}>*</span>
                    </span>
                  }
                  style={styles.formItem}
                >
                  <Input placeholder="Enter Username" style={styles.input} />
                </Form.Item>
                <Form.Item
                  label={
                    <span style={styles.labelSpan}>
                      Password <span style={styles.required}>*</span>
                    </span>
                  }
                  style={styles.formItem}
                >
                  <Input
                    placeholder="Enter Password"
                    type="password"
                    style={styles.input}
                  />
                </Form.Item>
              </div>
              <Form.Item style={styles.buttonItem}>
                <Button type="primary" style={styles.button}>
                  Save
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <div style={{ textAlign: "left", paddingBottom: "20px" }}>
              <Button type="primary" style={{ marginTop: "20px" }}>
                Final Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
