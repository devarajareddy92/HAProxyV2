import React, { useState } from "react";
import { Form, Input, Select, Table, Button, Row, Col, Tooltip, message } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";

const { Option } = Select;

const SwitchingRules = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      backendName: "",
      condition: "",
      aclName: "",
      index: 0,
    },
  ]);
  const [aclData, setAclData] = useState([]);
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    const newData = {
      key: count,
      backendName: "",
      condition: "",
      aclName: "",
      index: count,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleSelectChange = (value, key, column) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [column]: value });
      setDataSource(newData);
    }
  };

  const handleRemoveAcl = (index) => {
    const updatedData = aclData.filter((acl) => acl.index !== index);
    setAclData(updatedData);
    message.success("ACL deleted successfully");
  };

  const columns = [
    {
      title: "Backend Name",
      dataIndex: "backendName",
      render: (_, record) => (
        <Select
          style={styles.select}
          onChange={(value) => handleSelectChange(value, record.key, "backendName")}
        >
          <Option value="Backend1">Backend1</Option>
          <Option value="Backend2">Backend2</Option>
        </Select>
      ),
    },
    {
      title: "Condition",
      dataIndex: "condition",
      render: (_, record) => (
        <Select
          style={styles.select}
          onChange={(value) => handleSelectChange(value, record.key, "condition")}
        >
          <Option value="Condition1">Condition1</Option>
          <Option value="Condition2">Condition2</Option>
        </Select>
      ),
    },
    {
      title: "Acl Name",
      dataIndex: "aclName",
      render: (_, record) => (
        <Select
          style={styles.select}
          onChange={(value) => handleSelectChange(value, record.key, "aclName")}
        >
          <Option value="Acl1">Acl1</Option>
          <Option value="Acl2">Acl2</Option>
        </Select>
      ),
    },
    {
      title: "Index",
      dataIndex: "index",
      render: (_, record) => (
        <div style={styles.indexCell}>
          <Input
            type="number"
            value={record.index}
            onChange={(e) => handleSelectChange(e.target.value, record.key, "index")}
            style={styles.inputNumber}
          />
          <Button type="primary" onClick={handleAdd} style={styles.addButton}>
            +
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.key)} style={styles.deleteButton}>
            -
          </Button>
        </div>
      ),
    },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      backgroundColor: "#f0f2f5",  // Example background color similar to default.js
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      margin: "20px",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    },
    formItem: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    input: {
      width: "100%",
      marginBottom: "20px",
      backgroundColor: "#ffffff",  // Example input background color
      borderColor: "#d9d9d9",      // Example input border color
    },
    buttonRow: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
    },
    select: {
      width: "100%",
      backgroundColor: "#ffffff",  // Example select background color
    },
    indexCell: {
      display: "flex",
      alignItems: "center",
    },
    inputNumber: {
      width: "60px",
      marginRight: "8px",
      backgroundColor: "#ffffff",  // Example input number background color
      borderColor: "#d9d9d9",      // Example input number border color
    },
    addButton: {
      marginRight: "8px",
    },
    deleteButton: {},
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Switching Rules</div>
      <Form layout="vertical" style={styles.formItem}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Frontend Name" required>
              <Input placeholder="Enter the Frontend value" required style={styles.input} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table dataSource={dataSource} columns={columns} pagination={false} style={styles.table} />
    </div>
  );
};

export default SwitchingRules;
