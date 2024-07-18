import React, { useState, useEffect } from 'react';
import { Form, Input, Select,Table, Button, Row, Col, Tooltip, message } from 'antd';
import { PlusCircleFilled, MinusCircleFilled, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

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
    const [index, setIndex] = useState(0);
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
        const updatedData = aclData.filter(acl => acl.index !== index);
        setAclData(updatedData);
        message.success('ACL deleted successfully');
    };
    const columns = [
        {
            title: "Backend Name",
            dataIndex: "backendName",
            render: (_, record) => (
                <Select
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
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
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Input
                        type="number"
                        value={record.index}
                        onChange={(e) => handleSelectChange(e.target.value, record.key, "index")}
                        style={{ marginRight: 8 }}
                    />
                    <Button type="primary" onClick={handleAdd} style={{ marginRight: 8 }}>
                        +
                    </Button>
                    <Button type="danger" onClick={() => handleDelete(record.key)}>
                        -
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            <h3 style={{ marginBottom: "20px" }}>Switching Rules</h3>

            {/* <label style={{ marginBottom: "10px" }}>Frontend Name:</label>
      <Select style={{ width: "10%", marginBottom: "20px" }}>
        <Option value="Frontend1">Frontend1</Option>
        <Option value="Frontend2">Frontend2</Option>
      </Select> */}
            <br />
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={8}>
                    <Form.Item label="Frontend Name" required>
                        <Input
                            placeholder="Enter the Frontend value"
                            // value={frontendName.data.name}
                            // onChange={(e) => handleNameChange(e.target.value, index)}
                            required
                        />
                    </Form.Item>
                </Col>
                {/* <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        type="danger"
                        icon={<MinusCircleFilled />}
                        onClick={() => handleRemoveAcl(index)}
                    />
                </Col> */}
            </Row>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                style={{ marginTop: "16px", width: "80%" }}
            />
        </div>
    );
};

export default SwitchingRules;